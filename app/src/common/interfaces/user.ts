import { UserRole } from '@/common/enums/user'
import { AuthProvider } from '@/common/enums/auth'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  provider: AuthProvider
}
