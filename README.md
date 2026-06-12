# GameHok Frontend

A modern React (Vite) frontend for the GameHok tournament management platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

This repository is the single-page application (SPA) frontend for GameHok. It is built with React 18 and Vite, styled with Tailwind CSS, and uses Axios for HTTP requests.

## Key details

- Framework: React 18 (Vite)
- Bundler / dev server: Vite
- Styling: Tailwind CSS
- HTTP client: Axios
- Dev script: `npm run dev` (starts Vite)
- Build script: `npm run build` (outputs to `dist`)
- Preview script: `npm run preview` (preview production build)

## Requirements

- Node.js v16 or higher
- npm (or yarn)

## Getting started

1. Clone the repository

```bash
git clone https://github.com/Prapitesh/gamehok-frontend.git
cd gamehok-frontend
```

2. Install dependencies

```bash
npm install
# or
# yarn install
```

3. Run the dev server

```bash
npm run dev
```

Open your browser at http://localhost:3000 (or the port shown by Vite).

## Scripts (from package.json)

- `dev` — vite (development server)
- `build` — vite build (production build)
- `preview` — vite preview (serve production build locally)

If you use npm scripts with different names (lint/test), add them to package.json and update this README.

## Configuration

The API base URL used by the frontend is configured in `src/api/axios.js`. By default the repository uses `http://localhost:8087` as the backend URL — update it if your backend runs elsewhere.

## API Endpoints (frontend usage)

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/tournaments` - Create tournament
- `POST /api/teams/register` - Register team
- `GET /api/teams` - Get all teams
- `GET /api/matches` - Get all matches
- `GET /api/matches/{id}` - Get match by ID
- `POST /api/matches/{matchId}/result` - Submit match result
- `POST /api/brackets/generate` - Generate bracket
- `POST /api/kafka/send` - Send Kafka message

## Project structure (high-level)

```
gamehok-frontend/
├── src/
│   ├── api/                # axios configuration
│   ├── components/         # reusable components
│   ├── context/            # React contexts (Auth, etc.)
│   ├── pages/              # route pages (Home, Login, Tournaments...)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Build & deploy

Build for production:

```bash
npm run build
```

The production build will be written to the `dist` directory. Serve or deploy the `dist` contents to your static host (Netlify, Vercel, GitHub Pages, etc.).

## Dependencies

Relevant dependencies (from package.json):

- react ^18.2.0
- react-dom ^18.2.0
- react-router-dom ^6.20.0
- axios ^1.6.2
- lucide-react ^0.294.0

Dev dependencies:

- vite ^5.0.8
- @vitejs/plugin-react ^4.2.1
- tailwindcss ^3.3.6
- autoprefixer ^10.4.16
- postcss ^8.4.32

## License

MIT

---

If you want, I can also:
- Add CI / workflow badges (GitHub Actions) if present
- Add a contributing guide or CODE_OF_CONDUCT
- Automatically insert the exact API base URL or environment variable examples based on existing source files

Tell me if you'd like any of those and I'll update the README accordingly.
