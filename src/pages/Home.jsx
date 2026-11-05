import { useEffect, useMemo, useState } from 'react'
import CardGrid from '../components/CardGrid'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import FilterDropdown from '../components/FilterDropdown'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import SortControl from '../components/SortControl'
import { fetchPokemonDetails, fetchPokemonList, fetchPokemonTypes } from '../services/api'

const PAGE_SIZE = 12

function formatLabel(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function Home({ favorites, onToggleFavorite }) {
  const [pokemon, setPokemon] = useState([])
  const [allTypes, setAllTypes] = useState([])
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadPokemon = async () => {
      setLoading(true)
      setError('')

      try {
        const [pokemonList, typeList] = await Promise.all([
          fetchPokemonList(151),
          fetchPokemonTypes(),
        ])

        const resolvedPokemon = await Promise.all(
          pokemonList.map(async (entry) => fetchPokemonDetails(entry.id)),
        )

        if (!ignore) {
          setPokemon(resolvedPokemon)
          setAllTypes(typeList)
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message || 'Unable to load Pokémon right now.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadPokemon()

    return () => {
      ignore = true
    }
  }, [])

  const filteredPokemon = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    let nextList = [...pokemon]

    if (query) {
      nextList = nextList.filter((entry) => {
        const matchesName = entry.name.toLowerCase().includes(query)
        const matchesId = String(entry.id).includes(query)
        return matchesName || matchesId
      })
    }

    if (typeFilter !== 'all') {
      nextList = nextList.filter((entry) => entry.types.includes(typeFilter))
    }

    nextList.sort((first, second) => {
      switch (sortBy) {
        case 'name':
          return first.name.localeCompare(second.name)
        case 'hp':
          return second.hp - first.hp
        case 'attack':
          return second.attack - first.attack
        case 'id':
        default:
          return first.id - second.id
      }
    })

    return nextList
  }, [pokemon, searchTerm, typeFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE))
  const currentPageItems = filteredPokemon.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const resetFilters = () => {
    setSearchTerm('')
    setTypeFilter('all')
    setSortBy('id')
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <section className="page-section compact-section">
        <LoadingSpinner />
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section compact-section">
        <ErrorMessage message={error} onRetry={loadPokemon} />
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="hero-panel">
        <div>
          <p className="hero-kicker">Discover, compare, and save</p>
          <h2>Explore the world of Pokémon</h2>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{pokemon.length}</strong>
            <span>Pokémon</span>
          </div>
          <div>
            <strong>{favorites.length}</strong>
            <span>Saved</span>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value)
            setCurrentPage(1)
          }}
          onClear={() => {
            setSearchTerm('')
            setCurrentPage(1)
          }}
        />

        <FilterDropdown
          label="Type"
          value={typeFilter}
          onChange={(event) => {
            setTypeFilter(event.target.value)
            setCurrentPage(1)
          }}
          options={[
            { value: 'all', label: 'All types' },
            ...allTypes.map((type) => ({ value: type, label: formatLabel(type) })),
          ]}
        />

        <SortControl
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value)
            setCurrentPage(1)
          }}
        />
      </div>

      {filteredPokemon.length === 0 ? (
        <EmptyState
          message="Try a different name, type, or search keyword."
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <CardGrid
            pokemon={currentPageItems}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(nextPage) =>
              setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages))
            }
          />
        </>
      )}
    </section>
  )
}
