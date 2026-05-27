import { Express } from 'express';
import authRoutes from './auth.js';
import weatherRoutes from './weather.js';
import messageRoutes from './messages.js';

export function registerRoutes(app: Express) {
  app.use('/auth', authRoutes);
  app.use('/weather', weatherRoutes);
  app.use('/messages', messageRoutes);
}
