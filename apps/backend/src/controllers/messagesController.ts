import { Request, Response } from 'express';
import type { ApiResponse, Message } from '@shared/types';
import { createMessage, getMessagesForCity } from '../services/messageService.js';

type CreateMessageBody = {
  city: string;
  content: string;
};

export function createMessageHandler(
  req: Request<{}, {}, CreateMessageBody>,
  res: Response<ApiResponse<Message>>,
) {
  const { city, content } = req.body;
  const user = req.user;

  const message = createMessage({
    city,
    content,
    userId: user?.id,
    username: user?.username,
  });

  if (req.app.get('io')) {
    req.app.get('io').to(city).emit('message', message);
  }

  res.json({ success: true, data: message });
}

export function listMessagesHandler(
  req: Request<{ city: string }>,
  res: Response<ApiResponse<Message[]>>,
) {
  const city = req.params.city;
  res.json({ success: true, data: getMessagesForCity(city) });
}
