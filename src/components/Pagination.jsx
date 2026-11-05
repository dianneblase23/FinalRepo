export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="secondary-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="page-indicator">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className="secondary-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}
