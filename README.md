# LayeredFrontendDemo

A full-stack web application with a React frontend and Rails backend.

## Project Structure

```
apps/
  client/          # React web app (Vite + React 19 + Redux)
  server/          # Rails 8 API (PostgreSQL + Sidekiq)

libs/
  ui-components/   # React component library (TailwindCSS + Storybook)
  domain/          # Business logic and Redux store
  api-client/      # API client for backend
```

## Setup

### Prerequisites
- Node.js (v20.x)
- Ruby (3.x)
- Docker & Docker Compose
- Bundler
- npm

### Backend Setup

1. Start the database and Redis using Docker:
```bash
cd apps/server
docker compose up -d
```

2. Set up environment variables:
```bash
cp .example.env .env
```

3. Install dependencies and set up the database:
```bash
bundle install
bundle exec rails db:create db:migrate
```

4. Start the Rails server:
```bash
bundle exec rails s
```

### Frontend Setup

1. From the project root, install all dependencies for the monorepo:
```bash
npm install           # Install Nx
npm run install:all   # Install all packages and build libraries
```

2. Start the development server:
```bash
cd apps/client
npm run dev
```

The application should now be running:
- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend API: http://localhost:3000

## Development

### Building

```bash
# Build all libraries (from project root)
npm run build:libs

# Build everything (libraries + apps)
npm run build
```

### Component Development

To work on UI components in isolation:
```bash
cd libs/ui-components
npm run dev  # Opens Storybook
```

## Testing

```bash
# Frontend
cd apps/client && npm test

# Backend
cd apps/server && bundle exec rspec
```
