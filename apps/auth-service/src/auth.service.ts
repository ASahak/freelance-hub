import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { authenticator } from 'otplib';
import * as crypto from 'crypto-js';
import { MICROSERVICES } from '@libs/constants/microservices';
import { AuthProvider, User } from '@libs/types/user.type';
import { JwtPayload, Tokens } from './common/types';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@apps/auth-service/src/common/constants/global';
import { ConfigService } from '@nestjs/config';
import { ROUNDS_OF_HASHING } from '@apps/users-service/src/common/constants/global';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(MICROSERVICES.Users.name) private readonly usersClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'findUser' }, { id: userId })
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.provider !== AuthProvider.native) {
      throw new BadRequestException(
        `You cannot change your password because you logged in via ${user.provider}.`
      );
    }

    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPass, ROUNDS_OF_HASHING);

    return await firstValueFrom(
      this.usersClient.send(
        { cmd: 'updateUser' },
        { id: userId, data: { password: hashedNewPassword } }
      )
    );
  }

  private encryptSecret(secret: string): string {
    return crypto.AES.encrypt(
      secret,
      this.configService.get('twoFactorSecret')!,
    ).toString();
  }

  private decryptSecret(encryptedSecret: string): string {
    const bytes = crypto.AES.decrypt(
      encryptedSecret,
      this.configService.get('twoFactorSecret')!,
    );
    return bytes.toString(crypto.enc.Utf8);
  }

  async generateTwoFactorSecret(userId: string, email: string) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(email, 'Freelance Hub', secret);

    await firstValueFrom(
      this.usersClient.send(
        { cmd: 'setTwoFactorSecret' },
        { userId, secret: this.encryptSecret(secret) },
      ),
    );

    return { otpAuthUrl }; // This will be used to generate a QR code on the frontend
  }

  async verifyAndEnable2FA(userId: string, code: string) {
    const user: User = await firstValueFrom(
      this.usersClient.send({ cmd: 'findUser' }, { id: userId }),
    );
    if (!user.twoFactorSecret) {
      throw new UnauthorizedException('2FA not enabled');
    }

    const secret = this.decryptSecret(user.twoFactorSecret);

    const isValid = authenticator.check(code, secret);
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    // If valid, officially enable 2FA
    await firstValueFrom(
      this.usersClient.send({ cmd: 'enableTwoFactor' }, { userId }),
    );
    return { success: true };
  }

  async loginWith2FA(userId: string, code: string) {
    const user: User = await firstValueFrom(
      this.usersClient.send({ cmd: 'findUser' }, { id: userId }),
    );
    if (!user.twoFactorSecret) {
      throw new UnauthorizedException('2FA not activated');
    }

    const secret = this.decryptSecret(user.twoFactorSecret);

    const isValid = authenticator.check(code, secret);
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    // Code is valid, NOW we can issue tokens
    return this.getTokens(user.id, user.email); // Assuming getTokens issues both access/refresh tokens
  }

  async disable2FA(userId: string, password: string) {
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'findUser' }, { id: userId }), // Ensure this returns the password!
    );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return firstValueFrom(
      this.usersClient.send({ cmd: 'disableTwoFactor' }, { userId }),
    );
  }

  async login(
    email: string,
    pass: string,
  ): Promise<
    | { user: User; accessToken: string; refreshToken: string }
    | { twoFactorRequired: boolean; userId: string }
  > {
    const user: User | null = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'findUser' },
        {
          email,
        },
      ),
    );

    console.log('Logging USER:', user);
    if (user && user.provider === AuthProvider.native) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      if (user.isTwoFactorEnabled) {
        // Return a partial success response, forcing the user to complete 2FA
        return { twoFactorRequired: true, userId: user.id };
      }

      const { accessToken, refreshToken } = await this.getTokens(
        user.id,
        email,
      );

      await firstValueFrom(
        this.usersClient.send(
          { cmd: 'setRefreshToken' },
          { userId: user.id, refreshToken },
        ),
      );

      return { accessToken, refreshToken, user };
    } else {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'clearRefreshToken' }, { userId }),
    );
  }

  async refreshAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const user = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'findUserByRefreshToken' },
        { refreshToken },
      ),
    );

    if (!user) {
      throw new UnauthorizedException(
        'Refresh token is invalid or has been revoked',
      );
    }

    const { accessToken } = await this.getTokens(user.id, user.email);

    return { accessToken };
  }
}
