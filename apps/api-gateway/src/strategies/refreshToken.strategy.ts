import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req?.cookies?.refresh_token,
      ]),
      secretOrKey: configService.get('jwtRefreshTokenSecret')!,
      passReqToCallback: true,
    });
  }

  validate(req: any, payload: { email: string }) {
    const refreshToken = req?.cookies?.refresh_token;

    return { ...payload, refresh_token: refreshToken };
  }
}
