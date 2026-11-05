export default function FilterDropdown({ label, value, options, onChange }) {
  return (
    <label className="field-group">
      <span className="field-label">{label}</span>
      <select value={value} onChange={onChange} aria-label={label}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
