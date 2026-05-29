import { z } from 'zod';

// Zod schema for validating weather query params
export const weatherQuerySchema = z.object({
  city: z.string().min(1, 'City is required'),
});
