import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_EXPIRES_IN } from '@apps/auth-service/src/common/constants/global';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookieService {
  constructor(private configService: ConfigService) {}

  setTokenCookie(res: Response, token: string): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      path: '/',
    });
  }

  setRefreshTokenCookie(res: Response, token: string): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
      path: '/',
      maxAge: ms(REFRESH_TOKEN_EXPIRES_IN),
    });
  }

  clearTokensCookie(res: Response): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: isProduction,
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: isProduction,
    });
  }
}
