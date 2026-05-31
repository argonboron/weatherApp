import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import socket from '../realtime/socket';
import { useAuthStore } from '../store/authStore';

interface SocketContextValue {
  socket: typeof socket;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (token) {
      socket.auth = { token };
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [token]);

  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const contextValue = useMemo(() => ({ socket, connected }), [connected]);
  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
}
