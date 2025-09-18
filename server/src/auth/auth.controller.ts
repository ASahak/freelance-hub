import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import type { Response } from 'express';
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'
import { GoogleOauthGuard } from '@/auth/guards/google-oauth.guard';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
import { RegisterUserDto } from '@/auth/dto/register.dto';
import { UserRole } from '@/common/enums/user';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private configService: ConfigService, private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
    const user = await this.authService.register(registerUserDto);
    const token = await this.authService.jwtSign({ email: user.email })
    res.status(500).send({ success: true, data: { accessToken: token } });
  }

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(req.user.email)
      if (!user) {
        await this.authService.create({
          provider: req.user.provider,
          email: req.user.email,
          name: req.user.name,
          role: UserRole.GEEK,
          password: null,
        });
      }

      const token = await this.authService.jwtSign({ email: req.user.email })
      res.redirect(`${this.configService.get('appOrigin')}/oauth?token=${token}`);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}
