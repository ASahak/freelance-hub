import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import type { Response } from 'express'
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthEntity } from './entity/auth.entity'
import { LoginDto } from './dto/login.dto'
import { GoogleOauthGuard } from '@/auth/guards/google-oauth.guard'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@/users/users.service'
import { RegisterUserDto } from '@/auth/dto/register-user.dto'
import { UserRole } from '@/common/enums/user'
import { AuthProvider } from '@prisma/client'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UserEntity } from '@/users/entity/user.entity'
import type { AuthenticatedRequest } from '@/common/interfaces/authenticated-request.interface'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  me(@Req() req: AuthenticatedRequest) {
    return req.user
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @Post('register')
  @ApiOkResponse({ type: AuthEntity })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response
  ) {
    const user = await this.authService.register(registerUserDto)
    const token = this.authService.jwtSign({ email: user.email })
    res.status(500).send({ success: true, data: { accessToken: token } })
  }

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.findOne({ email: req.user.email })

      if (!user) {
        await this.authService.create({
          provider: AuthProvider.google,
          email: req.user.email,
          name: req.user.name,
          role: UserRole.GEEK,
          password: null
        })
      }

      const token = this.authService.jwtSign({ email: req.user.email })
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        path: '/' // Make the cookie available for the entire domain
      })

      res.redirect(this.configService.get('appOrigin')!)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send({ success: false, message: err.message })
      } else {
        console.error('An unexpected error type was caught:', err)
        res
          .status(500)
          .send({ success: false, message: 'An unexpected error occurred.' })
      }
    }
  }
}
