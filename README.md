# Realtime Weather + Messaging Monorepo

This is a full-stack TypeScript app with a small surface area and clear boundaries.

## Built With

- React + Vite + TypeScript on the frontend
- Node.js + Express + TypeScript on the backend
- Socket.IO for realtime messages
- TanStack Query for server state
- Zustand for auth state
- Zod for request validation
- A shared workspace package for common types

## Structure

The folder layout is there to keep the code easy to scan:

- backend controllers handle HTTP orchestration
- backend middleware covers auth and validation
- backend services hold business logic and in-memory data
- backend validation keeps request shapes explicit
- frontend pages own route-level UI
- frontend reusable UI is grouped by component, with styles next to the component
- frontend realtime code stays in a dedicated folder
- shared types live in a workspace package so both apps use the same contracts

## Repository Layout

```text
apps/
  backend/
	 src/
		controllers/
		middleware/
		routes/
		services/
		tests/
		utils/
		validation/
		websocket/
  frontend/
	 src/
		api/
		components/
		  ChatBox/
		  CitySelect/
		  ConnectionStatus/
		  LogoutButton/
		  ProtectedRoute/
		  WeatherCard/
		hooks/
		pages/
		providers/
		realtime/
		routes/
		store/
packages/
  shared/
```

## Setup

1. Install dependencies.

   ```bash
   pnpm install
   ```

2. Create a `.env` file with the values the app reads:

   ```bash
   JWT_SECRET=your-secret
   WEATHER_API_KEY=your-weather-api-key
   VITE_API_URL=http://localhost:4000
   VITE_SOCKET_URL=http://localhost:4000
   PORT=4000
   ```

3. Start the workspace.

   ```bash
   pnpm run dev
   ```

4. Build everything.

   ```bash
   pnpm run build
   ```

5. Run the backend tests.

   ```bash
   pnpm test
   ```

## Notes

- The app uses in-memory storage, so data resets on restart.
- Authentication is intentionally lightweight.
- REST and websocket traffic share the same contracts through `@shared/types`.
- The backend keeps REST and websocket code separate on purpose.

## Validation

The repository currently builds with:

```bash
pnpm -r run build
```
