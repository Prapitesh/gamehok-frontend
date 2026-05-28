# GameHok Frontend

A modern ReactJS frontend for the GameHok tournament management platform.

## Features

- **Authentication**: User registration and login with JWT token management
- **Tournaments**: Create and manage gaming tournaments
- **Teams**: Register teams and view all registered teams
- **Matches**: View matches and submit match results
- **Brackets**: Generate tournament brackets
- **Kafka Integration**: Send messages via Kafka topics

## Tech Stack

- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8087`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Configuration

The API base URL is configured in `src/api/axios.js`. By default, it points to `http://localhost:8087`. Update this if your backend is running on a different port or URL.

## API Endpoints

The frontend connects to the following backend endpoints:

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

## Project Structure

```
gamehok-frontend/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios configuration
│   ├── components/
│   │   └── Navbar.jsx        # Navigation component
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context
│   ├── pages/
│   │   ├── Home.jsx          # Home page
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Registration page
│   │   ├── Tournaments.jsx   # Tournaments page
│   │   ├── Teams.jsx         # Teams page
│   │   ├── Matches.jsx       # Matches page
│   │   ├── Brackets.jsx      # Brackets page
│   │   └── Kafka.jsx         # Kafka page
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT
