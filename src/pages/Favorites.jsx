import CardGrid from '../components/CardGrid'
import EmptyState from '../components/EmptyState'

export default function Favorites({ favorites, onToggleFavorite }) {
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
      />
    </section>
  )
}
