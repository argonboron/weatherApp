import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setupWebsocket } from '../websocket/index.js';
import type { Message } from '@shared/types';
import { verifyJWT } from '../middleware/auth.js';

function createFakeSocket() {
  const handlers = new Map<string, (...args: unknown[]) => void>();
  const events: Array<{ event: string; payload: unknown }> = [];
  const joinedRooms: string[] = [];
  const leftRooms: string[] = [];

  return {
    user: { id: 'user-1', username: 'Tester' },
    handlers,
    events,
    joinedRooms,
    leftRooms,
    join(room: string) {
      joinedRooms.push(room);
    },
    leave(room: string) {
      leftRooms.push(room);
    },
    on(event: string, handler: (...args: unknown[]) => void) {
      handlers.set(event, handler);
    },
    emit(event: string, payload: unknown) {
      events.push({ event, payload });
    },
  };
}

function createFakeIo() {
  let connectionHandler: ((socket: ReturnType<typeof createFakeSocket>) => void) | null = null;
  const emissions: Array<{ room: string; event: string; payload: unknown }> = [];

  return {
    emissions,
    use() {
      return undefined;
    },
    on(event: 'connection', handler: (socket: ReturnType<typeof createFakeSocket>) => void) {
      if (event === 'connection') {
        connectionHandler = handler;
      }
    },
    to(room: string) {
      return {
        emit(event: string, payload: unknown) {
          emissions.push({ room, event, payload });
        },
      };
    },
    connect(socket: ReturnType<typeof createFakeSocket>) {
      if (!connectionHandler) {
        throw new Error('No connection handler registered');
      }
      connectionHandler(socket);
    },
  };
}

test('websocket setup registers join, leave, and sendMessage handlers', () => {
  const io = createFakeIo();
  setupWebsocket(io as never);

  const socket = createFakeSocket();
  io.connect(socket);

  assert.deepEqual(socket.events[0], {
    event: 'connectionStatus',
    payload: { status: 'connected' },
  });

  socket.handlers.get('joinCity')?.('Paris');
  socket.handlers.get('leaveCity')?.('Paris');
  socket.handlers.get('sendMessage')?.({ city: 'Paris', content: 'Hello room' });

  assert.deepEqual(socket.joinedRooms, ['Paris']);
  assert.deepEqual(socket.leftRooms, ['Paris']);
  assert.equal(io.emissions.at(-1)?.room, 'Paris');
  assert.equal(io.emissions.at(-1)?.event, 'message');

  const emittedMessage = io.emissions.at(-1)?.payload as Message | undefined;
  assert.equal(emittedMessage?.city, 'Paris');
  assert.equal(emittedMessage?.content, 'Hello room');
  assert.equal(emittedMessage?.username, 'Tester');
});

test('websocket auth middleware rejects connections without a token', () => {
  const socket = {
    handshake: { auth: {}, headers: {} },
  };
  let capturedError: Error | undefined;

  verifyJWT(socket as never, (error) => {
    capturedError = error;
  });

  assert.equal(capturedError?.message, 'Authentication error: No token provided');
});

test('websocket auth middleware rejects invalid bearer tokens', () => {
  const socket = {
    handshake: { auth: {}, headers: { authorization: 'Bearer invalid-token' } },
  };
  let capturedError: Error | undefined;
  const originalConsoleError = console.error;

  console.error = () => undefined;

  try {
    verifyJWT(socket as never, (error) => {
      capturedError = error;
    });
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(capturedError?.message, 'Authentication error: Invalid token');
});
