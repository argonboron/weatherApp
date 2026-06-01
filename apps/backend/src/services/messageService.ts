import { Message } from '@shared/types';

const messagesByCity: Record<string, Message[]> = {};

function createMessageId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export interface NewMessageInput {
  city: string;
  content: string;
  userId?: string;
  username?: string;
}

export function createMessage(input: NewMessageInput): Message {
  const normalizedCity = input.city.trim();
  const message: Message = {
    id: createMessageId(),
    city: normalizedCity,
    userId: input.userId || 'anonymous',
    username: input.username || 'Anonymous',
    content: input.content,
    timestamp: Date.now(),
  };

  if (!messagesByCity[normalizedCity]) {
    messagesByCity[normalizedCity] = [];
  }

  messagesByCity[normalizedCity].push(message);
  return message;
}

export function getMessagesForCity(city: string): Message[] {
  return messagesByCity[city] || [];
}
