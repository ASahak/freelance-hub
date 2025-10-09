import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices';
import { MICROSERVICES } from '@shared/constants/microservices';
import { firstValueFrom } from 'rxjs';

const cookieExtractor = (
  req: Request & { cookies: Record<string, any> }
): string | null => {
  // The 'cookies' property is added by the cookie-parser middleware
  if (req && req.cookies) {
    const token: string = (req.cookies['access_token'] ||
      '') as unknown as string
    if (token) {
      return token
    }
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject(MICROSERVICES.Users.name) private readonly usersClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('jwtSecret')!
    })
  }

  async validate(payload: { email: string }) {
    const user = await firstValueFrom(this.usersClient.send({ cmd: 'findUser' }, { email: payload.email }))

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
