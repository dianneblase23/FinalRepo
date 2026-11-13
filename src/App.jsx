import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'

const STORAGE_KEY = 'pokevault-favorites'
const THEME_STORAGE_KEY = 'pokevault-theme'

function readTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function readFavorites() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [favorites, setFavorites] = useState(readFavorites)
  const [theme, setTheme] = useState(readTheme)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (!notice) {
      return undefined
    }

    const timer = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timer)
  }, [notice])

  const onToggleFavorite = (pokemon) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((favorite) => favorite.id === pokemon.id)

      if (exists) {
        setNotice(`${pokemon.name} removed from favorites.`)
        return currentFavorites.filter((favorite) => favorite.id !== pokemon.id)
      }

      setNotice(`${pokemon.name} added to favorites.`)
      return [
        ...currentFavorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          types: pokemon.types,
          hp: pokemon.hp,
          attack: pokemon.attack,
        },
      ]
    })
  }

  return (
    <div className="app-shell">
      <Header
        favoritesCount={favorites.length}
        theme={theme}
        onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')}
      />

      {notice && (
        <div className="toast" role="status" aria-live="polite">
          {notice}
        </div>
      )}

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} onToggleFavorite={onToggleFavorite} />}
          />
          <Route
            path="/item/:id"
            element={<Details favorites={favorites} onToggleFavorite={onToggleFavorite} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} onToggleFavorite={onToggleFavorite} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
