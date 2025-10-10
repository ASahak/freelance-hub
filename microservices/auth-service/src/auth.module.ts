import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EXPIRES_IN } from '@/common/constants/global'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@shared/constants/microservices';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([{
      name: MICROSERVICES.Users.name,
      transport: Transport.TCP,
      options: { host: MICROSERVICES.Users.host, port: MICROSERVICES.Users.port },
    }]),
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
  ]
})
export class AuthModule {}
