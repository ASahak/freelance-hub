import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersProxyModule } from '../proxy/user-proxy.module';
import { AuthProxyModule } from '../proxy/auth-proxy.module';
import { FilesModule } from '../files/files.module';
import { CookieModule } from '../cookie/cookie.module';

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
        secret: config.get('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, ConfigService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
