import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import type { Response } from 'express';
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'
import { GoogleOauthGuard } from '@/auth/guards/google-oauth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private configService: ConfigService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.jwtSign({ email: req.user.email, id: req.user.id })
      res.redirect(`${this.configService.get('appOrigin')}/oauth?token=${token}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}
