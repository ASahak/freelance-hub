import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GoogleOauthGuard } from '../../guards/google-oauth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole, AuthProvider } from '@libs/types/user.type';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserEntity } from '../users/entity/user.entity';
import type { AuthenticatedRequest } from '../../common/interfaces/authenticated-request.interface';
import { FilesService } from '../files/files.service';
import { CookieService } from '../cookie/cookie.service';
import { MICROSERVICES } from '@libs/constants/microservices';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(MICROSERVICES.Auth.name)
    private readonly authService: ClientProxy,
    @Inject(MICROSERVICES.Users.name)
    private readonly usersService: ClientProxy,
    private readonly filesService: FilesService,
    private readonly cookieService: CookieService,
    private configService: ConfigService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  me(@Req() req: AuthenticatedRequest) {
    return new UserEntity(req.user);
  }

  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async generate2FA(@Req() req: AuthenticatedRequest) {
    console.log(`Generating qr for: ${req.user.id}`, req.user);
    const { otpAuthUrl } = await firstValueFrom(
      this.authService.send(
        { cmd: '2fa-generate-secret' },
        { userId: req.user.id, email: req.user.email },
      ),
    );
    // You would then use a library like 'qrcode' to send this back as a data URL
    return { qrCodeUrl: otpAuthUrl };
  }

  @Post('2fa/verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async verify2FA(
    @Req() req: AuthenticatedRequest,
    @Body() { code }: { code: string },
  ) {
    return firstValueFrom(
      this.authService.send(
        { cmd: '2fa-verify-and-enable' },
        { userId: req.user.id, code },
      ),
    );
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Password updated successfully' })
  async changePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    await firstValueFrom(
      this.authService.send(
        { cmd: 'change-password' },
        {
          userId: req.user.id,
          oldPass: dto.currentPassword,
          newPass: dto.newPassword,
        },
      ),
    );

    return { success: true, message: 'Password updated successfully' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return firstValueFrom(
      this.authService.send({ cmd: 'forgot-password' }, { email: body.email }),
    );
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return firstValueFrom(
      this.authService.send({ cmd: 'reset-password' }, body),
    );
  }

  @Post('2fa/disable')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async disable2FA(
    @Req() req: AuthenticatedRequest,
    @Body() body: { password: string },
  ) {
    return firstValueFrom(
      this.authService.send(
        { cmd: '2fa-disable' },
        { userId: req.user.id, password: body.password },
      ),
    );
  }

  @Post('2fa/login')
  async loginWith2FA(
    @Body() { userId, code }: { userId: string; code: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    // This call will fail if the code is wrong
    const { user, accessToken, refreshToken } = await firstValueFrom(
      this.authService.send({ cmd: '2fa-login' }, { userId, code }),
    );

    // If successful, set the cookies and return the user
    this.cookieService.setTokenCookie(res, accessToken);
    this.cookieService.setRefreshTokenCookie(res, refreshToken);
    return new UserEntity(user);
  }

  @Post('refresh')
  @ApiOkResponse({ type: UserEntity })
  async refreshToken(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const { accessToken } = await firstValueFrom(
      this.authService.send({ cmd: 'refreshToken' }, { token: refreshToken }),
    );

    this.cookieService.setTokenCookie(res, accessToken);
    res.status(HttpStatus.OK).json({ message: 'Token updated' });
  }

  @Post('login')
  @ApiOkResponse({ type: UserEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await firstValueFrom(
      this.authService.send({ cmd: 'login' }, { email, password }),
    );

    if (response.twoFactorRequired) {
      return {
        twoFactorRequired: true,
        userId: response.userId,
      };
    }

    const { user, accessToken, refreshToken } = response;

    this.cookieService.setTokenCookie(res, accessToken);
    this.cookieService.setRefreshTokenCookie(res, refreshToken);

    return new UserEntity(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User logged out successfully.' })
  async logout(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await firstValueFrom(
      this.authService.send({ cmd: 'logout' }, { userId: req.user.id }),
    );

    this.cookieService.clearTokensCookie(res);
    res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await firstValueFrom(
      this.authService.send(
        { cmd: 'registerUser' },
        { ...registerUserDto, provider: AuthProvider.native },
      ),
    );

    // Set the correct HTTP status for a created resource
    res.status(HttpStatus.CREATED);

    return new UserEntity(user);
  }

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    try {
      let user = await firstValueFrom(
        this.usersService.send({ cmd: 'findUser' }, { email: req.user.email }),
      );
      if (!user) {
        user = await firstValueFrom(
          this.authService.send(
            { cmd: 'registerUser' },
            {
              provider: AuthProvider.google,
              email: req.user.email,
              name: req.user.name,
              role: UserRole.geek,
            },
          ),
        );

        if (req.user.avatarUrl) {
          try {
            const avatarUrl = await this.filesService.uploadAvatarFromUrl(
              req.user.avatarUrl,
            );
            await firstValueFrom(
              this.usersService.send(
                { cmd: 'updateUser' },
                { id: user.id, data: { avatarUrl } },
              ),
            );
          } catch (error: any) {
            console.log(`Couldn't upload avatar due to: ${error.message}`);
          }
        }
      }

      const { accessToken, refreshToken } = await firstValueFrom(
        this.authService.send(
          { cmd: 'getTokens' },
          {
            email: req.user.email,
            id: user.id,
          },
        ),
      );
      this.cookieService.setTokenCookie(res, accessToken);
      this.cookieService.setRefreshTokenCookie(res, refreshToken);

      res.redirect(this.configService.get('appOrigin')!);
    } catch (err) {
      res.redirect(
        `${this.configService.get('appOrigin')}/login?serverError=${err.message || 'An unexpected error occurred.'}`,
      );
    }
  }
}
