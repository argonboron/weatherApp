// Shared types/interfaces for the monorepo

export interface User {
  id: string;
  username: string;
  // TODO: Add more user fields as needed
}

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface WeatherResponse {
  city: string;
  temperature: number;
  condition: string;
  // TODO: Add more weather fields as needed
}

export interface Message {
  id: string;
  city: string;
  userId: string;
  content: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Websocket event types
export interface ClientToServerEvents {
  joinCity: (city: string) => void;
  sendMessage: (payload: { city: string; content: string }) => void;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
  presence: (userIds: string[]) => void;
  connectionStatus: (status: 'connected' | 'reconnecting' | 'disconnected') => void;
}
