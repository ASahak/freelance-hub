import { UserRole } from '@/common/enums/user'
import { AuthProvider } from '@/common/enums/auth'

export interface IUser {
  id: string
  email: string
  name: string
  avatarUrl: string | null
  role: UserRole
  provider: AuthProvider
}

export interface ICreateUser {
  email: string
  name: string
  password: string
  role: UserRole
  provider: AuthProvider
}

export type ISignInCredentials = Pick<ICreateUser, 'email' | 'password'>
