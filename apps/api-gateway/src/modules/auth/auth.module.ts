import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from '../../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../../strategies/refreshToken.strategy';
import { AuthController } from './auth.controller';
import { UsersProxyModule } from '../proxy/user-proxy.module';
import { AuthProxyModule } from '../proxy/auth-proxy.module';
import { FilesModule } from '../files/files.module';
import { CookieModule } from '../cookie/cookie.module';
import { ACCESS_TOKEN_EXPIRES_IN } from '../../common/constants/global';

@Module({
  imports: [
    CookieModule,
    FilesModule,
    AuthProxyModule,
    UsersProxyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtAccessTokenSecret'),
        signOptions: {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, ConfigService],
  exports: [PassportModule],
})
export class AuthModule {}
