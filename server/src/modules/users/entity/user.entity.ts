import { ApiProperty } from '@nestjs/swagger'
import { UserRole, AuthProvider, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  role: UserRole

  @ApiProperty()
  provider: AuthProvider

  @Exclude()
  password: string | null

  @ApiProperty({ nullable: true })
  avatarUrl: string | null
}
