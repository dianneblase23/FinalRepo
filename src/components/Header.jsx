import Navbar from './Navbar'

export default function Header({ favoritesCount }) {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            P
          </div>
          <div>
            <span className="eyebrow">Pokédex</span>
            <h1>PokeVault</h1>
          </div>
        </div>
        <Navbar favoritesCount={favoritesCount} />
      </div>
    </header>
  )
}
