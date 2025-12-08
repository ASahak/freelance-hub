import { Request } from 'express';
import { User } from '@libs/types/user.type';

export type UserWithSession = User & { sessionId: string };

export interface AuthenticatedRequest extends Request {
  user: UserWithSession;
}
