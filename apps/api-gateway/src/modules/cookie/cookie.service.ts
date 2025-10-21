import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setTokenCookie(res: Response, token: string): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
  }

  clearTokenCookie(res: Response): void {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: isProduction ? 'none' : 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }
}
