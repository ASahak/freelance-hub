import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@libs/constants/global';
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
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: ms(ACCESS_TOKEN_EXPIRES_IN),
    });
  }

  setRefreshTokenCookie(res: Response, token: string): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: ms(REFRESH_TOKEN_EXPIRES_IN),
    });
  }

  clearTokensCookie(res: Response): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
    });
  }
}
