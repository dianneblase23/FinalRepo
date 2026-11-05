export default function EmptyState({ message, onResetFilters }) {
  return (
    <div className="empty-state">
      <h2>No Pokémon found</h2>
      <p>{message}</p>
      {onResetFilters && (
        <button type="button" className="primary-button" onClick={onResetFilters}>
          Clear filters
        </button>
      )}
    </div>
  )
}
