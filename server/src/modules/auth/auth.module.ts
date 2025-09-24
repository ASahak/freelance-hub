import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EXPIRES_IN } from '@/common/constants/auth'
import { JwtStrategy } from './guards/jwt.strategy'
import { UsersModule } from '@/modules/users/users.module'
import { GoogleStrategy } from '@/modules/auth/guards/google-oauth.strategy'
import { FilesModule } from '@/modules/files/files.module'

@Module({
  imports: [
    FilesModule,
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
  providers: [AuthService, JwtStrategy, ConfigService, GoogleStrategy]
})
export class AuthModule {}
