import { Server } from 'socket.io';
import { verifyJWT } from '../middleware/auth.js';
import type { ClientToServerEvents, ServerToClientEvents } from '@shared/types';
import { createMessage } from '../services/messageService.js';

export function setupWebsocket(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  io.use(verifyJWT);

  io.on('connection', (socket) => {
    socket.on('joinCity', (city: string) => {
      socket.join(city);
    });

    socket.on('leaveCity', (city: string) => {
      socket.leave(city);
    });

    socket.on('sendMessage', (payload: { city: string; content: string }) => {
      if (!payload.city || !payload.content) return;
      const user = socket.user;
      const msg = createMessage({
        city: payload.city,
        content: payload.content,
        userId: user?.id,
        username: user?.username,
      });
      io.to(payload.city).emit('message', msg);
    });

    socket.emit('connectionStatus', { status: 'connected' });

    socket.on('disconnect', (reason) => {
      socket.emit('connectionStatus', { status: 'disconnected', reason });
      console.log(`Socket ${socket.id} disconnected:`, reason);
    });
  });
}
