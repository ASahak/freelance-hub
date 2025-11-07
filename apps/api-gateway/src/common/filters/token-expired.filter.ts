import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 401,
      message: 'Token expired',
      error: 'TokenExpired',
    });
  }
}
