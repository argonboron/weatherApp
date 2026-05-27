import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerRoutes } from './routes/index.js';
import { setupWebsocket } from './websocket/index.js';

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Add middleware for logging, error handling, JWT auth

registerRoutes(app); // Register REST routes

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

setupWebsocket(io); // Setup Socket.IO handlers

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
