import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { configDotenv } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { AUTH_PROVIDERS } from '@/common/enums/auth';

configDotenv();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService,) {
    super({
      clientID: configService.get('googleClientId')!,
      clientSecret: configService.get('googleClientSecret')!,
      callbackURL: configService.get('googleRedirectURI')!,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: AUTH_PROVIDERS.GOOGLE,
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}