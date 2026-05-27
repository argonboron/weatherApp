import { Server } from 'socket.io';
// import { verifyJWT } from '../middleware/auth';
// import { Message } from '@shared/types';

export function setupWebsocket(io: Server) {
  io.use((socket, next) => {
    // TODO: Authenticate socket using JWT
    next();
  });

  io.on('connection', (socket) => {
    // TODO: Handle joining city rooms, presence, reconnection
    socket.on('joinCity', (city: string) => {
      socket.join(city);
      // TODO: Track presence
    });

    socket.on('sendMessage', (payload) => {
      // TODO: Validate, store, and emit message to city room
      io.to(payload.city).emit('message', { ...payload, id: 'TODO', timestamp: Date.now() });
    });

    // TODO: Emit connection status, handle disconnects
  });
}
