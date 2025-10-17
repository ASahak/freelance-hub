import {
  Body,
  Controller,
  Get,
  HttpStatus, Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GoogleOauthGuard } from '../../guards/google-oauth.guard'
import { LoginDto } from './dto/login.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserRole, AuthProvider } from '@libs/types/user.type'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { UserEntity } from '../users/entity/user.entity'
import type { AuthenticatedRequest } from '../../common/interfaces/authenticated-request.interface'
import { FilesService } from '../files/files.service'
import { CookieService } from '../cookie/cookie.service'
import { MICROSERVICES } from '@libs/constants/microservices';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(MICROSERVICES.Auth.name) private readonly authServiceClient: ClientProxy,
    @Inject(MICROSERVICES.Users.name) private readonly usersServiceClient: ClientProxy,
    private readonly filesService: FilesService,
    private readonly cookieService: CookieService,
    private configService: ConfigService,
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
    const { user, accessToken } = await firstValueFrom(this.authServiceClient.send({ cmd: 'login' }, { email, password }))

    this.cookieService.setTokenCookie(res, accessToken)

    return new UserEntity(user)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User logged out successfully.' })
  logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearTokenCookie(res)

    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' })
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, accessToken } = await firstValueFrom(this.usersServiceClient.send({ cmd: 'registerUser' }, registerUserDto))

    this.cookieService.setTokenCookie(res, accessToken)

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
      let user = await firstValueFrom(this.usersServiceClient.send({ cmd: 'getUser'}, { email: req.user.email }))
      if (!user) {
        user = await firstValueFrom(this.usersServiceClient.send({ cmd: 'createUser' }, {
          provider: AuthProvider.google,
          email: req.user.email,
          name: req.user.name,
          role: UserRole.geek
        }))

        if (req.user.avatarUrl) {
          try {
            const avatarUrl = await this.filesService.uploadAvatarFromUrl(
              req.user.avatarUrl
            )
            await firstValueFrom(this.usersServiceClient.send({ cmd: 'updateUser' } , { id: user.id, data: { avatarUrl } }))
          } catch (error: any) {
            console.log(`Couldn't upload avatar due to: ${error.message}`)
          }
        }
      }

      const accessToken = await firstValueFrom(this.authServiceClient.send({ cmd: 'jwtSign' }, {
        email: req.user.email,
        id: user.id
      }))
      this.cookieService.setTokenCookie(res, accessToken)

      res.redirect(this.configService.get('appOrigin')!)
    } catch (err) {
      res.redirect(
        `${this.configService.get('appOrigin')}/login?serverError=${err.message || 'An unexpected error occurred.'}`
      )
    }
  }
}
