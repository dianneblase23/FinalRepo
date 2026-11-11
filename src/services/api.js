const API_BASE_URL = import.meta.env.VITE_POKEMON_API_URL || 'https://pokeapi.co/api/v2'

async function getJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchPokemonList(limit = 151) {
  const data = await getJson(`${API_BASE_URL}/pokemon?limit=${limit}`)

  return data.results.map((pokemon) => {
    const id = Number(pokemon.url.split('/').filter(Boolean).pop())

    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
    }
  })
}

export async function fetchPokemonTypes() {
  const data = await getJson(`${API_BASE_URL}/type?limit=50`)
  return data.results.map((type) => type.name)
}

export async function fetchPokemonDescription(id) {
  const data = await getJson(`${API_BASE_URL}/pokemon-species/${id}`)
  const entry =
    data.flavor_text_entries.find((flavorText) => flavorText.language.name === 'en') ||
    data.flavor_text_entries[0]

  if (!entry) {
    throw new Error(`No species description found for Pokémon ${id}.`)
  }

  return entry.flavor_text.replace(/[\f\n\r]+/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function fetchPokemonDetails(id) {
  const data = await getJson(`${API_BASE_URL}/pokemon/${id}`)

  const pokemon = {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.['official-artwork']?.front_default ||
      data.sprites.front_default ||
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
    types: data.types.map((entry) => entry.type.name),
    hp: data.stats.find((entry) => entry.stat.name === 'hp')?.base_stat ?? 0,
    attack: data.stats.find((entry) => entry.stat.name === 'attack')?.base_stat ?? 0,
    defense: data.stats.find((entry) => entry.stat.name === 'defense')?.base_stat ?? 0,
    speed: data.stats.find((entry) => entry.stat.name === 'speed')?.base_stat ?? 0,
    abilities: data.abilities.map((entry) => entry.ability.name),
    height: data.height,
    weight: data.weight,
    moves: data.moves.slice(0, 8).map((entry) => entry.move.name),
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  }

  return pokemon
}
