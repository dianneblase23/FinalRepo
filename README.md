# PokeVault

PokeVault is a responsive React SPA for browsing Pokémon from the public PokeAPI. It includes live search, type filters, sorting, pagination, favorites saved in localStorage, and dedicated detail and favorites routes.

## Features

- Search by name or ID
- Filter by Pokémon type
- Sort by ID, name, HP, or attack
- Pagination through large results
- Favorites saved with localStorage
- Detail page for each Pokémon
- Responsive design for desktop, tablet, and mobile

## Tech stack

- React
- Vite
- React Router
- PokeAPI
- CSS3

## Getting started

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Build the app for production:
   npm run build

## Environment variables

Copy `.env.example` to `.env` and update values if needed:

```bash
cp .env.example .env
```

## Git workflow

This project is organized for a collaborative Git workflow:

- Create a feature branch before making changes
- Commit with clear conventional commit messages such as `feat:`, `fix:`, or `style:`
- Open a pull request before merging into `main`

## API source

This app uses the public Pokémon API available at: https://pokeapi.co/api/v2
