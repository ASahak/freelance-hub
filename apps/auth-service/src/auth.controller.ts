import { BadRequestException, Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import type { User } from '@prisma/client';
import { MICROSERVICES } from '@libs/constants/microservices';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { AuthProvider } from '@libs/types/user.type';
import * as bcrypt from 'bcrypt';
import { ROUNDS_OF_HASHING } from './common/constants/global';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    @Inject(MICROSERVICES.Users.name)
    private readonly usersService: ClientProxy,
  ) {}

  async forgotPassword(email: string) {
    const user = await firstValueFrom(
      this.usersService.send({ cmd: 'findOneUser' }, { email }),
    );

    if (!user || user.provider !== AuthProvider.native) {
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1hour

    await firstValueFrom(
      this.usersService.send(
        { cmd: 'setPasswordResetToken' },
        {
          userId: user.id,
          hashedToken,
          expiresAt,
        },
      ),
    );

    const resetLink = `${this.configService.get('appOrigin')}/reset-password?token=${resetToken}`;
    console.log(`[EMAIL SERVICE MOCK] To: ${email}, Link: ${resetLink}`);

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await firstValueFrom(
      this.usersService.send({ cmd: 'findUserByResetToken' }, { hashedToken }),
    );

    if (!user) {
      throw new BadRequestException('Token is invalid or expired');
    }

    if (new Date() > new Date(user.passwordResetExpiresAt)) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, ROUNDS_OF_HASHING);

    await firstValueFrom(
      this.usersService.send(
        { cmd: 'updateUser' },
        {
          id: user.id,
          data: {
            password: hashedPassword,
            passwordResetTokenHash: null,
            passwordResetExpiresAt: null,
          },
        },
      ),
    );

    return { message: 'Password reset successfully' };
  }

  @MessagePattern({ cmd: 'change-password' })
  async changePassword(
    @Payload() data: { userId: string; oldPass: string; newPass: string },
  ) {
    return this.authService.changePassword(
      data.userId,
      data.oldPass,
      data.newPass,
    );
  }

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

  @MessagePattern({ cmd: '2fa-disable' })
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
    return this.authService.getTokens(data.id, data.email);
  }

  @MessagePattern({ cmd: 'logout' })
  logout(@Payload() data: { userId: string }) {
    return this.authService.logout(data.userId);
  }
}
