import jsonwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import type { UserPayload } from '@shared/types';

const { verify } = jsonwt;

type SocketNext = (err?: Error) => void;

export function verifyJWT(socket: Socket, next: SocketNext) {
  const token = socket.handshake.auth?.token || socket.handshake.headers['authorization'];
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = verify(token.replace(/^Bearer /, ''), secret);
    socket.user = decoded as UserPayload;
    next();
  } catch (err) {
    console.error(err);
    next(new Error('Authentication error: Invalid token'));
  }
}
