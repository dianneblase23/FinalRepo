import { NavLink } from 'react-router-dom'

export default function Navbar({ favoritesCount, theme, onToggleTheme }) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        to="/favorites"
      >
        Favorites
      </NavLink>
      <span className="favorites-pill" aria-live="polite">
        ❤ {favoritesCount}
      </span>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </nav>
  )
}
