import CardItem from './CardItem'

export default function CardGrid({ pokemon, favorites, onToggleFavorite }) {
  return (
    <div className="card-grid">
      {pokemon.map((item) => {
        const isFavorite = favorites.some((favorite) => favorite.id === item.id)

        return (
          <CardItem
            key={item.id}
            pokemon={item}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        )
      })}
    </div>
  )
}
