# Realtime Weather + Messaging Monorepo

A modern full-stack demo app with React, TypeScript, Node.js, Socket.IO, and WeatherAPI.com.

## Monorepo Structure

- `apps/frontend` — React + Vite + TypeScript client
- `apps/backend` — Node.js + Express + TypeScript + Socket.IO server
- `packages/shared` — Shared types/interfaces

## Tech Stack

- pnpm workspaces
- React, Vite, TypeScript, React Router, TanStack Query, Socket.IO client
- Node.js, Express, TypeScript, Socket.IO, Zod
- Shared ESLint + Prettier config

## Setup

1. Install pnpm: `npm install -g pnpm`
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and fill in your API keys
4. Start backend: `pnpm --filter backend dev`
5. Start frontend: `pnpm --filter frontend dev`

## Features

- JWT auth, city selection, weather display, realtime messaging, websocket events
- In-memory storage only (no DB)
