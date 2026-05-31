import { User } from '@shared/types';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Pick<User, 'id' | 'username'>;
  }
}
