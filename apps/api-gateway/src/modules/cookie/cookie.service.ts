import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_EXPIRES_IN } from '@apps/auth-service/src/common/constants/global';
import ms from 'ms';

@Injectable()
export class CookieService {
  constructor() {}

  setTokenCookie(res: Response, token: string): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
  }

  setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: ms(REFRESH_TOKEN_EXPIRES_IN),
    });
  }

  clearTokensCookie(res: Response): void {
    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }
}
