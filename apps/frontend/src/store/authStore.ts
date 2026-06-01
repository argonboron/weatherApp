import { create } from 'zustand';
import type { PublicUser } from '@shared/types';

interface AuthState {
  token: string | null;
  user: PublicUser | null;
  login: (token: string, user: PublicUser) => void;
  logout: () => void;
}

const getInitialToken = () => localStorage.getItem('token');
const getInitialUser = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(user);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'id' in parsed &&
      'username' in parsed &&
      typeof (parsed as { id: unknown }).id === 'string' &&
      typeof (parsed as { username: unknown }).username === 'string'
    ) {
      return {
        id: (parsed as { id: string }).id,
        username: (parsed as { username: string }).username,
      } satisfies PublicUser;
    }
  } catch {}

  localStorage.removeItem('user');
  return null;
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
