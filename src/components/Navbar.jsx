import { NavLink } from 'react-router-dom'

export default function Navbar({ favoritesCount }) {
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
    </nav>
  )
}
