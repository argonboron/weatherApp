import { User } from '@shared/types';
import { comparePassword, hashPassword } from '../utils/password.js';

const users: User[] = [];

export async function registerUser(username: string, password: string): Promise<User> {
  if (users.some((u) => u.username === username)) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user: User = { id: Date.now().toString(), username, hashedPassword };
  users.push(user);
  return user;
}

export async function attemptLogin(username: string, password: string): Promise<User> {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error('User not found');
  }

  if (await comparePassword(password, user.hashedPassword)) {
    return user;
  } else {
    throw new Error('Incorrect Password');
  }
}

export function findUser(username: string): User | undefined {
  return users.find((u) => u.username === username);
}
