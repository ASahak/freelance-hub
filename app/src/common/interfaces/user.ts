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
