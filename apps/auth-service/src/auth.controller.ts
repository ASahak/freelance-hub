import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type { User } from '@prisma/client';
import { MICROSERVICES } from '@libs/constants/microservices';
import { firstValueFrom } from 'rxjs';
import { IMeta } from '@libs/types/session.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(MICROSERVICES.Users.name)
    private readonly usersService: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'forgotPassword' })
  async forgotPassword(@Payload() data: { email: string }) {
    return this.authService.forgotPassword(data.email);
  }

  @MessagePattern({ cmd: 'resetPassword' })
  async resetPassword(@Payload() data: { token: string; newPassword: string }) {
    return this.authService.resetPassword(data.token, data.newPassword);
  }

  @MessagePattern({ cmd: 'changePassword' })
  async changePassword(
    @Payload() data: { userId: string; oldPass: string; newPass: string },
  ) {
    return this.authService.changePassword(
      data.userId,
      data.oldPass,
      data.newPass,
    );
  }

  @MessagePattern({ cmd: '2faGenerateSecret' })
  async generate2FASecret(
    @Payload() { userId, email }: { userId: string; email: string },
  ) {
    return this.authService.generateTwoFactorSecret(userId, email);
  }

  @MessagePattern({ cmd: '2faVerifyAndEnable' })
  async verify2FA(
    @Payload() { userId, code }: { userId: string; code: string },
  ) {
    return this.authService.verifyAndEnable2FA(userId, code);
  }

  @MessagePattern({ cmd: '2faLogin' })
  async loginWith2FA(
    @Payload()
    { userId, code, meta }: { userId: string; code: string; meta: IMeta },
  ) {
    return this.authService.loginWith2FA(userId, code, meta);
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Payload()
    { email, password, meta }: { email: string; password: string; meta: IMeta },
  ) {
    return await this.authService.login(email, password, meta);
  }

  @MessagePattern({ cmd: '2faDisable' })
  async disable2fa(
    @Payload() { userId, password }: { userId: string; password: string },
  ) {
    console.log(`Disabling users 2fa for: ${userId}`);
    return await this.authService.disable2FA(userId, password);
  }

  @MessagePattern({ cmd: 'registerUser' })
  async register(@Payload() user: User) {
    return await firstValueFrom(
      this.usersService.send({ cmd: 'create' }, user),
    );
  }

  @MessagePattern({ cmd: 'refreshToken' })
  refreshToken(@Payload() data: { token: string }) {
    return this.authService.refreshAccessToken(data.token);
  }

  @MessagePattern({ cmd: 'getTokens' })
  getTokens(@Payload() data: { id: string; email: string }) {
    return this.authService.getTokens({ userId: data.id, email: data.email });
  }

  @MessagePattern({ cmd: 'logout' })
  logout(@Payload() data: { sessionId: string; userId: string }) {
    return this.authService.logout(data.sessionId, data.userId);
  }
}
