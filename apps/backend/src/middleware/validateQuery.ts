import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validateQuery<TSchema extends z.ZodTypeAny>(schema: TSchema) {
  return (req: Request<{}, {}, {}, z.infer<TSchema>>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid query parameters', details: result.error });
    }
    req.query = result.data;
    next();
  };
}
