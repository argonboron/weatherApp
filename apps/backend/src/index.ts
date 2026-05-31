import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerRoutes } from './routes/index.js';
import { setupWebsocket } from './websocket/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

registerRoutes(app);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

setupWebsocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
