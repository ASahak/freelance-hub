import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AuthProvider, User } from '@prisma/client'
import { CreateUserDto, RegisterUserDto } from '@/auth/dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  jwtSign(user: Partial<User>) {
    return this.jwtService.sign({ ...user })
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.usersService.create({
      ...registerUserDto,
      provider: AuthProvider.native
    })
  }

  async create(createUserDto: CreateUserDto) {
    // creation is for google auth for example
    return this.usersService.create({
      ...createUserDto,
      provider: AuthProvider.google
    })
  }

  async login(email: string, pass: string): Promise<any> {
    const user: User | null = await this.usersService.findOne({ email })

    if (user && user.provider === AuthProvider.native) {
      const isPasswordValid = await bcrypt.compare(pass, user.password!)

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password')
      }

      const accessToken: string = this.jwtSign({ id: user.id })
      return { accessToken }
    } else {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
  }
}
