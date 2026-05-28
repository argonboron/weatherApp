import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; username: string } | null;
  login: (token: string, user: { id: string; username: string }) => void;
  logout: () => void;
}

const getInitialToken = () => localStorage.getItem('token');
const getInitialUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getInitialToken(),
  user: getInitialUser(),
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));
