export default function SortControl({ value, onChange }) {
  const options = [
    { value: 'id', label: 'Sort by ID' },
    { value: 'name', label: 'Sort by Name' },
    { value: 'hp', label: 'Sort by HP' },
    { value: 'attack', label: 'Sort by Attack' },
  ]

  return (
    <label className="field-group">
      <span className="field-label">Sort</span>
      <select value={value} onChange={onChange} aria-label="Sort Pokémon">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
