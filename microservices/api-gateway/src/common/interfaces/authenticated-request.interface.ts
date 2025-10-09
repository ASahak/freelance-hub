import { Request } from 'express'
import { User } from '@shared/types/user.type'

export interface AuthenticatedRequest extends Request {
  user: User
}
