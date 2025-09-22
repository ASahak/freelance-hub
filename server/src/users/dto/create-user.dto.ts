import { AuthProvider } from '@prisma/client'
import { UserRole } from '@/common/enums/user'

export class CreateUserDto {
  email: string
  name: string
  password?: string | null
  role: UserRole
  provider: AuthProvider
}
