import Navbar from './Navbar'

function BrandLogo() {
  return (
    <div className="brand-mark" role="img" aria-label="PokeVault logo">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd166" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef476f" />
          </linearGradient>
        </defs>

        <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#brandGradient)" />
        <circle cx="32" cy="32" r="23" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <path d="M13 32H51" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M21 16V48H31.5C39.8 48 46 42.1 46 33.9C46 25.9 39.8 20 31.5 20H21ZM27 24V40H31.3C35.8 40 39 37.2 39 33.9C39 30.8 35.8 28 31.3 28H27V24Z"
          fill="#1d1330"
        />
        <circle cx="32" cy="32" r="4.5" fill="#1d1330" />
      </svg>
    </div>
  )
}

export default function Header({ favoritesCount }) {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="brand-block">
          <BrandLogo />
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
