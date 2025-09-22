import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { UsersService } from '@/users/users.service'
import { ConfigService } from '@nestjs/config'

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
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get('jwtSecret')!
    })
  }

  async validate(payload: { email: string }) {
    const user = await this.usersService.findOne({ email: payload.email })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
