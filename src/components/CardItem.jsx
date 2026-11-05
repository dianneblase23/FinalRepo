import { Link } from 'react-router-dom'

export default function CardItem({ pokemon, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleFavorite(pokemon)
  }

  return (
    <article className="pokemon-card">
      <button
        type="button"
        className={`favorite-toggle ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
      >
        {isFavorite ? '★ Saved' : '☆ Save'}
      </button>

      <Link to={`/item/${pokemon.id}`} className="card-link">
        <img src={pokemon.image} alt={pokemon.name} />
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <h3>{pokemon.name}</h3>
        <div className="type-row">
          {pokemon.types.map((type) => (
            <span key={`${pokemon.id}-${type}`} className="type-badge">
              {type}
            </span>
          ))}
        </div>
        <div className="mini-stats">
          <span>HP {pokemon.hp}</span>
          <span>ATK {pokemon.attack}</span>
        </div>
      </Link>
    </article>
  )
}
