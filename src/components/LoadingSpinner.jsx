export default function LoadingSpinner() {
  return (
    <div className="loading-state" aria-live="polite" aria-busy="true">
      <div className="spinner" aria-hidden="true" />
      <p>Loading Pokémon data...</p>
    </div>
  )
}
