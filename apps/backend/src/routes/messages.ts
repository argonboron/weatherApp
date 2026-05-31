import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { Message } from '@shared/types';

// In-memory message store: { [city: string]: Message[] }
const messages: Record<string, Message[]> = {};

const router = Router();

// Zod schema for message creation
const messageSchema = z.object({
  city: z.string().min(1),
  text: z.string().min(1),
});

router.post('/', validateRequest(messageSchema), (req, res) => {
  const { city, text } = req.body;
  // Attach user type for TypeScript
  const user = (req as any).user as { id: string; username: string } | undefined;
  const msg: Message = {
    id: Math.random().toString(36).slice(2),
    city,
    userId: user?.id || 'anonymous',
    username: user?.username || 'Anonymous',
    content: text,
    timestamp: Date.now(),
  };
  if (!messages[city]) messages[city] = [];
  messages[city].push(msg);

  // Emit to city room via websocket (if io is attached to req)
  if (req.app.get('io')) {
    req.app.get('io').to(city).emit('message', msg);
  }

  res.json({ success: true, data: msg });
});

router.get('/:city', (req, res) => {
  const city = req.params.city;
  res.json({ success: true, data: messages[city] || [] });
});

export default router;
