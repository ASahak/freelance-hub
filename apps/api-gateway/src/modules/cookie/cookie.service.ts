import { Injectable } from '@nestjs/common';
import { Response } from 'express';

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

  clearTokenCookie(res: Response): void {
    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }
}
