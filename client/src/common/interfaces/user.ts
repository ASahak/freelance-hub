import { UserRole } from '@/common/enums/user';
import { AuthProvider } from '@/common/enums/auth';

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  provider: AuthProvider;
}

export type ISignInCredentials = Pick<ICreateUser, 'email' | 'password'>;
