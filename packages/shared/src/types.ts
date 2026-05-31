export interface User {
  id: string;
  username: string;
  hashedPassword: string;
}

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface WeatherResponse {
  city: string;
  country: string;
  temperatureC: number;
  feelsLikeC: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windKph: number;
  uv: number;
  isDay: boolean;
  updatedAt: string;
}

export interface Message {
  id: string;
  city: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

export interface WeatherApiError {
  code: number;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ClientToServerEvents {
  joinCity: (city: string) => void;
  sendMessage: (payload: { city: string; content: string }) => void;
}

export interface ServerToClientEvents {
  message: (message: Message) => void;
  presence: (userIds: string[]) => void;
  connectionStatus: (status: 'connected' | 'reconnecting' | 'disconnected') => void;
}
