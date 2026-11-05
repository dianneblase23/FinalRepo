import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchPokemonDetails } from '../services/api'

export default function Details({ favorites, onToggleFavorite }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadPokemon() {
      setLoading(true)
      setError('')

      try {
        const details = await fetchPokemonDetails(id)
        if (!ignore) {
          setPokemon(details)
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message || 'Unable to load Pokémon details.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadPokemon()

    return () => {
      ignore = true
    }
  }, [id])

  const isFavorite = useMemo(
    () => favorites.some((favorite) => favorite.id === Number(id)),
    [favorites, id],
  )

  if (loading) {
    return (
      <section className="page-section compact-section">
        <LoadingSpinner />
      </section>
    )
  }

  if (error || !pokemon) {
    return (
      <section className="page-section compact-section">
        <ErrorMessage message={error || 'Pokemon not found.'} />
      </section>
    )
  }

  return (
    <section className="page-section detail-page">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-hero">
        <div className="detail-figure">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="detail-content">
          <div className="detail-header-row">
            <div>
              <p className="hero-kicker">#{String(pokemon.id).padStart(3, '0')}</p>
              <h2>{pokemon.name}</h2>
            </div>
            <button
              type="button"
              className={`primary-button ${isFavorite ? 'favorite-active' : ''}`}
              onClick={() => onToggleFavorite(pokemon)}
            >
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>

          <div className="type-row detail-types">
            {pokemon.types.map((type) => (
              <span key={`${pokemon.id}-${type}`} className="type-badge">
                {type}
              </span>
            ))}
          </div>

          <div className="info-grid">
            <div className="info-card">
              <span>Height</span>
              <strong>{pokemon.height / 10} m</strong>
            </div>
            <div className="info-card">
              <span>Weight</span>
              <strong>{pokemon.weight / 10} kg</strong>
            </div>
            <div className="info-card">
              <span>Abilities</span>
              <strong>{pokemon.abilities.length}</strong>
            </div>
          </div>

          <div className="stats-grid">
            {pokemon.stats.map((stat) => (
              <div key={stat.name} className="stat-item">
                <span>{stat.name}</span>
                <div className="stat-meter">
                  <div style={{ width: `${Math.min(stat.value, 100)}%` }} />
                </div>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>

          <div className="moves-box">
            <h3>Featured moves</h3>
            <div className="type-row">
              {pokemon.moves.map((move) => (
                <span key={`${pokemon.id}-${move}`} className="move-tag">
                  {move}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
