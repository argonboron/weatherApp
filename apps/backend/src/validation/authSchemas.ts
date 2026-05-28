import { z } from 'zod';

export const usernameSchema = z.string().min(5);
export const passwordSchema = z.string().min(8);

export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
