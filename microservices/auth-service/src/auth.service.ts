import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '@/modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AuthProvider, User } from '@prisma/client'
import {
  CreateUserDto,
  RegisterUserDto
} from '@/modules/auth/dto/register-user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  jwtSign(user: Pick<User, 'id' | 'email'>) {
    return this.jwtService.sign({ ...user })
  }

  async register(registerUserDto: RegisterUserDto) {
    const user: User | null = await this.usersService.findOne({
      email: registerUserDto.email
    })

    if (user) {
      throw new NotFoundException('User exists with this email.')
    }

    return this.usersService.create({
      ...registerUserDto,
      provider: AuthProvider.native
    })
  }

  async create(createUserDto: CreateUserDto) {
    const user: User | null = await this.usersService.findOne({
      email: createUserDto.email
    })

    if (user) {
      throw new NotFoundException('User exists with this email.')
    }

    // creation is for google auth for example
    return this.usersService.create({
      ...createUserDto,
      provider: AuthProvider.google
    })
  }

  async login(
    email: string,
    pass: string
  ): Promise<{ user: User; accessToken: string }> {
    const user: User | null = await this.usersService.findOne({ email })

    if (user && user.provider === AuthProvider.native) {
      const isPasswordValid = await bcrypt.compare(pass, user.password!)

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password')
      }

      const accessToken: string = this.jwtSign({ id: user.id, email })
      return { accessToken, user }
    } else {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
  }
}
