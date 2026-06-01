import { Request, Response } from 'express';
import jsonwt from 'jsonwebtoken';
const { sign } = jsonwt;
import { attemptLogin, registerUser } from '../services/userService.js';
import { AuthPayload, AuthResponse } from '@shared/types';

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return 'Unknown error';
}

export async function register(req: Request<{}, {}, AuthPayload>, res: Response<AuthResponse>) {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    const token = sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '1h' },
    );
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (err: unknown) {
    if (getErrorMessage(err) === 'Username already exists') {
      return res.status(409).json({ success: false, error: 'Username already exists.' });
    }
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}

export async function login(req: Request<{}, {}, AuthPayload>, res: Response<AuthResponse>) {
  const { username, password } = req.body;
  try {
    const user = await attemptLogin(username, password);
    const token = sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '1h' },
    );
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    if (message === 'Incorrect Password' || message === 'User not found') {
      return res.status(401).json({ success: false, error: 'Incorrect username or password' });
    }
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}
