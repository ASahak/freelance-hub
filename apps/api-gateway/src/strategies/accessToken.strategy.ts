import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES } from '@libs/constants/microservices';

const cookieExtractor = (
  req: Request & { cookies: Record<string, any> },
): string | null => {
  // The 'cookies' property is added by the cookie-parser middleware
  if (req && req.cookies) {
    const token: string = (req.cookies['access_token'] ||
      '') as unknown as string;
    if (token) {
      return token;
    }
  }
  return null;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject(MICROSERVICES.Users.name)
    private readonly usersClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('jwtAccessTokenSecret')!,
    });
  }

  async validate(payload: { email: string; sessionId: string }) {
    const user = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'validateSession' },
        { sessionId: payload.sessionId },
      ),
    );

    if (!user) {
      throw new UnauthorizedException('Session invalidated');
    }

    return { ...user, sessionId: payload.sessionId };
  }
}
