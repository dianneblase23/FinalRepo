import CardItem from './CardItem'

export default function CardGrid({
  pokemon,
  favorites,
  onToggleFavorite,
  descriptions = {},
  descriptionStatus = {},
}) {
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
            description={descriptions[item.id]}
            descriptionStatus={descriptionStatus[item.id]}
          />
        )
      })}
    </div>
  )
}
