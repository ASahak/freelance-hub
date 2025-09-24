import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import type { Response } from 'express'
import { AuthService } from './auth.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { GoogleOauthGuard } from '@/modules/auth/guards/google-oauth.guard'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@/modules/users/users.service'
import { RegisterUserDto } from '@/modules/auth/dto/register-user.dto'
import { UserRole, AuthProvider } from '@prisma/client'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'
import { UserEntity } from '@/modules/users/entity/user.entity'
import type { AuthenticatedRequest } from '@/common/interfaces/authenticated-request.interface'
import { FilesService } from '@/modules/files/files.service'

const setTokenCookie = (
  res: Response,
  token: string,
  configService: ConfigService
) => {
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: configService.get('NODE_ENV') === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly filesService: FilesService,
    private readonly authService: AuthService,
    private configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  me(@Req() req: AuthenticatedRequest) {
    return new UserEntity(req.user)
  }

  @Post('login')
  @ApiOkResponse({ type: UserEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, accessToken } = await this.authService.login(email, password)

    setTokenCookie(res, accessToken, this.configService)

    return new UserEntity(user)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User logged out successfully.' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production'
    })

    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' })
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.register(registerUserDto)
    const accessToken = this.authService.jwtSign({
      email: user.email,
      id: user.id
    })

    setTokenCookie(res, accessToken, this.configService)

    // Set the correct HTTP status for a created resource
    res.status(HttpStatus.CREATED)

    return new UserEntity(user)
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
        const newUser = await this.authService.create({
          provider: AuthProvider.google,
          email: req.user.email,
          name: req.user.name,
          role: UserRole.geek,
          password: null
        })

        if (req.user.avatarUrl) {
          try {
            const avatarUrl = await this.filesService.uploadAvatarFromUrl(
              req.user.avatarUrl
            )
            await this.usersService.update(newUser.id, { avatarUrl })
          } catch (error: any) {
            console.log(`Couldn't upload avatar due to: ${error.message}`)
          }
        }
      }

      const token = this.authService.jwtSign({ email: req.user.email })
      setTokenCookie(res, token, this.configService)

      res.redirect(this.configService.get('appOrigin')!)
    } catch (err) {
      res.redirect(
        `${this.configService.get('appOrigin')}/login?serverError=${err.message || 'An unexpected error occurred.'}`
      )
    }
  }
}
