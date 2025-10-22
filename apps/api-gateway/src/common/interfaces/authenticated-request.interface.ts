import { Request } from 'express';
import { User } from '@libs/types/user.type';

export interface AuthenticatedRequest extends Request {
  user: User;
}
