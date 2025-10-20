# OBM

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

### Frontend
```bash
cd apps/client
npm install
npm run dev
```

### Backend
```bash
cd apps/server
bundle install
rails db:create db:migrate
rails server
```

## Testing

```bash
# Frontend
cd apps/client && npm test

# Backend
cd apps/server && bundle exec rspec
```
