import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type { User } from '@prisma/client';
import { MICROSERVICES } from '@libs/constants/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(MICROSERVICES.Users.name)
    private readonly usersServiceClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: '2fa-generate-secret' })
  async generate2FASecret(
    @Payload() { userId, email }: { userId: string; email: string },
  ) {
    return this.authService.generateTwoFactorSecret(userId, email);
  }

  @MessagePattern({ cmd: '2fa-verify-and-enable' })
  async verify2FA(
    @Payload() { userId, code }: { userId: string; code: string },
  ) {
    return this.authService.verifyAndEnable2FA(userId, code);
  }

  @MessagePattern({ cmd: '2fa-login' })
  async loginWith2FA(
    @Payload() { userId, code }: { userId: string; code: string },
  ) {
    return this.authService.loginWith2FA(userId, code);
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Payload() { email, password }: { email: string; password: string },
  ) {
    return await this.authService.login(email, password);
  }

  @MessagePattern({ cmd: 'registerUser' })
  async register(@Payload() user: User) {
    return await firstValueFrom(
      this.usersServiceClient.send({ cmd: 'create' }, user),
    );
  }

  @MessagePattern({ cmd: 'refreshToken' })
  refreshToken(@Payload() data: { token: string }) {
    return this.authService.refreshAccessToken(data.token);
  }

  @MessagePattern({ cmd: 'getTokens' })
  getTokens(@Payload() data: { id: string; email: string }) {
    return this.authService.getTokens(data.id, data.email);
  }

  @MessagePattern({ cmd: 'logout' })
  logout(@Payload() data: { userId: string }) {
    return this.authService.logout(data.userId);
  }
}
