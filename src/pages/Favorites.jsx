import { useEffect, useRef, useState } from 'react'
import CardGrid from '../components/CardGrid'
import EmptyState from '../components/EmptyState'
import { fetchPokemonDescription } from '../services/api'

export default function Favorites({ favorites, onToggleFavorite }) {
  const [descriptions, setDescriptions] = useState({})
  const [descriptionStatus, setDescriptionStatus] = useState({})
  const [retryCount, setRetryCount] = useState(0)
  const requestedIds = useRef(new Set())

  useEffect(() => {
    const missingDescriptions = favorites.filter(
      (pokemon) => !requestedIds.current.has(pokemon.id),
    )

    if (missingDescriptions.length === 0) {
      return
    }

    missingDescriptions.forEach(({ id }) => requestedIds.current.add(id))
    setDescriptionStatus((current) => ({
      ...current,
      ...Object.fromEntries(missingDescriptions.map(({ id }) => [id, 'loading'])),
    }))

    Promise.allSettled(
      missingDescriptions.map(async (pokemon) => ({
        id: pokemon.id,
        description: await fetchPokemonDescription(pokemon.id),
      })),
    ).then((results) => {
      const loadedDescriptions = {}
      const nextStatus = {}

      results.forEach((result, index) => {
        const id = missingDescriptions[index].id
        if (result.status === 'fulfilled') {
          loadedDescriptions[id] = result.value.description
          nextStatus[id] = 'loaded'
        } else {
          nextStatus[id] = 'error'
        }
      })

      setDescriptions((current) => ({ ...current, ...loadedDescriptions }))
      setDescriptionStatus((current) => ({ ...current, ...nextStatus }))
    })
  }, [favorites, retryCount])

  if (favorites.length === 0) {
    return (
      <section className="page-section compact-section">
        <EmptyState
          message="You have no saved Pokémon yet. Add a few favorites from the home page."
        />
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="hero-panel favorites-panel">
        <div>
          <p className="hero-kicker">Your collection</p>
          <h2>Favorite Pokémon</h2>
        </div>
      </div>

      <CardGrid
        pokemon={favorites}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        descriptions={descriptions}
        descriptionStatus={descriptionStatus}
      />
      {Object.values(descriptionStatus).includes('error') && (
        <p className="description-error" role="status">
          Some Pokémon descriptions could not be loaded.{' '}
          <button type="button" onClick={() => {
            const failedIds = Object.entries(descriptionStatus)
              .filter(([, status]) => status === 'error')
              .map(([id]) => Number(id))
            failedIds.forEach((id) => requestedIds.current.delete(id))
            setDescriptionStatus((current) => {
              const next = { ...current }
              failedIds.forEach((id) => delete next[id])
              return next
            })
            setRetryCount((count) => count + 1)
          }}>
            Try again
          </button>
        </p>
      )}
    </section>
  )
}
