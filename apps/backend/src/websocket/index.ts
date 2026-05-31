import { Server } from 'socket.io';
import { verifyJWT } from '../middleware/auth.js';
import { Message } from '@shared/types.js';

export function setupWebsocket(io: Server) {
  io.use(verifyJWT);

  io.on('connection', (socket) => {
    socket.on('joinCity', (city: string) => {
      socket.join(city);
    });

    socket.on('sendMessage', (payload) => {
      if (!payload.city || !payload.text) return;
      const user = (socket as any).user;
      const msg: Message = {
        id: Math.random().toString(36).slice(2),
        city: payload.city,
        userId: user?.id || 'anonymous',
        username: user?.username || 'Anonymous',
        content: payload.text,
        timestamp: Date.now(),
      };
      io.to(payload.city).emit('message', msg);
    });

    socket.emit('connectionStatus', { status: 'connected' });

    socket.on('disconnect', (reason) => {
      socket.emit('connectionStatus', { status: 'disconnected', reason });
      console.log(`Socket ${socket.id} disconnected:`, reason);
    });
  });
}
