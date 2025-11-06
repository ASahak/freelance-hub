import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(
    @Payload() { email, password }: { email: string; password: string },
  ) {
    return await this.authService.login(email, password);
  }
  //
  // @MessagePattern({ cmd: 'registerUser' })
  // async register(@Payload() registerUser: User) {
  //   const user = await this.authService.register(registerUser);
  //   const { access_token: accessToken } = await this.authService.getTokens(user.id, user.email);
  //
  //   return { user, accessToken };
  // }

  @MessagePattern({ cmd: 'refreshToken' })
  refreshToken(@Payload() data: { token: string }) {
    return this.authService.refreshAccessToken(data.token);
  }

  @MessagePattern({ cmd: 'logout' })
  logout(@Payload() data: { userId: string }) {
    return this.authService.logout(data.userId);
  }
}
