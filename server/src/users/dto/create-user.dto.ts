import { UserRole, AuthProvider } from '@prisma/client'

export class CreateUserDto {
  email: string
  name: string
  password?: string | null
  role: UserRole
  provider: AuthProvider
}
