import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email)

    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password)

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password')
      }

      return { accessToken: this.jwtService.sign({ userId: user.id }) }
    } else {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
  }
}
