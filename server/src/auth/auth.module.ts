import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { UsersService } from '@/users/users.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PrismaModule } from '@/prisma/prisma.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EXPIRES_IN } from '@/common/constants/auth'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: EXPIRES_IN
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService]
})
export class AuthModule {}
