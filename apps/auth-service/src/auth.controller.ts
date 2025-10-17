import {
  Controller,
} from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'login' })
  async login(
    @Payload() { email, password }: { email: string; password: string },
  ) {
    const { user, accessToken } = await this.authService.login(email, password)

    return { user, accessToken }
  }

  @MessagePattern({ cmd: 'signJwt' })
  async signJwt(
    @Payload() data: { id: string; email: string },
  ) {
    return this.authService.jwtSign(data)
  }
}
