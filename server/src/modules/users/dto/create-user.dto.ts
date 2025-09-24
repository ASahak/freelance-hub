import { UserRole, AuthProvider } from '@prisma/client'

export class CreateUserDto {
  email: string
  name: string
  password?: string | null
  avatarUrl?: string | null
  role: UserRole
  provider: AuthProvider
}
