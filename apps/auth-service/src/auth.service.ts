import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from '@libs/constants/microservices';
import { AuthProvider, User } from '@libs/types/user.type';
import { JwtPayload, Tokens } from './common/types';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '@apps/auth-service/src/common/constants/global';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(MICROSERVICES.Users.name) private readonly usersClient: ClientProxy,
  ) {}

  async login(
    email: string,
    pass: string,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
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

      const { access_token, refresh_token } = await this.getTokens(user.id, email);

      await firstValueFrom(
        this.usersClient.send(
          { cmd: 'setRefreshToken' },
          { userId: user.id, refreshToken: refresh_token },
        ),
      );

      return { accessToken: access_token, refreshToken: refresh_token, user };
    } else {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      access_token,
      refresh_token,
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

    const { access_token: accessToken } = await this.getTokens(user.id, user.email);

    return { accessToken };
  }
}
