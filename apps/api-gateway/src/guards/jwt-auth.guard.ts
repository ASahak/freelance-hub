import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredException } from '../common/filters/token-expired.filter';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: Error) {
    if (info && info.name === 'TokenExpiredError') {
      throw new TokenExpiredException();
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }

    return user;
  }
}
