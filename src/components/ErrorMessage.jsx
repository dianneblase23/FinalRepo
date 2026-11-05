export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-panel" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="primary-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
