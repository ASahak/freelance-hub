import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { UsersService } from '@/users/users.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PrismaModule } from '@/prisma/prisma.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EXPIRES_IN } from '@/common/constants/auth'
import { JwtStrategy } from './guards/jwt.strategy'
import { UsersModule } from '@/users/users.module'
import { GoogleStrategy } from '@/auth/guards/google-oauth.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: EXPIRES_IN
        }
      }),
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, ConfigService, GoogleStrategy]
})
export class AuthModule {}
