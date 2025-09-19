import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { CreateUserDto, RegisterUserDto } from '@/auth/dto/register-user.dto';
import { AUTH_PROVIDERS } from '@/common/enums/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async jwtSign (user: Partial<User>) {
      return this.jwtService.sign({ ...user });
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.usersService.create({ ...registerUserDto, provider: AUTH_PROVIDERS.NATIVE });
  }

  async create(createUserDto: CreateUserDto) { // creation is for google auth for example
    return this.usersService.create({ ...createUserDto, provider: AUTH_PROVIDERS.GOOGLE });
  }

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email })

    if (user && user.provider === AUTH_PROVIDERS.NATIVE) {
      const isPasswordValid = await bcrypt.compare(pass, user.password!)

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password')
      }

      const accessToken = await this.jwtSign({ id: user.id })
      return { accessToken }
    } else {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
  }
}
