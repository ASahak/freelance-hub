import { AUTH_PROVIDERS } from '@/common/enums/auth';
import { UserRole } from '@/common/enums/user';

export class CreateUserDto {
  email: string;
  name: string;
  password?: string | null;
  role: UserRole;
  provider?: AUTH_PROVIDERS;
}