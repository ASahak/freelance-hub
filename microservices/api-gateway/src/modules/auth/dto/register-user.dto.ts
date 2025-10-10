import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { UserRole, AuthProvider } from '@shared/types/user.type'

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provider: AuthProvider

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: UserRole

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @ApiProperty({ type: String })
  password: string

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  avatarUrl: string | null
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provider: AuthProvider

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  role: UserRole

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string | null

  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  avatarUrl?: string | null
}
