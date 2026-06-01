import jsonwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { UserPayload } from '@shared/types';

const { verify } = jsonwt;

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const decoded = verify(token.replace(/^Bearer /, ''), secret) as UserPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid authentication token' });
  }
}
