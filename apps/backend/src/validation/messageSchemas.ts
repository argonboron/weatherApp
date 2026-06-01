import { z } from 'zod';

export const messageSchema = z.object({
  city: z.string().min(1),
  content: z.string().min(1),
});
