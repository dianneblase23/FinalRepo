export default function SearchBar({ value, onChange, onClear }) {
  return (
    <label className="field-group search-group">
      <span className="field-label">Search</span>
      <div className="search-field">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by name or ID"
          aria-label="Search Pokémon"
        />
        {value && (
          <button type="button" className="search-clear" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
    </label>
  )
}
