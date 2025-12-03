import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES_IN } from './common/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './apps/auth-service/.env',
    }),
    PassportModule,
    ClientsModule.register([
      {
        name: MICROSERVICES.Mail.name,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICES.Mail.host,
          port: MICROSERVICES.Mail.port,
        },
      },
      {
        name: MICROSERVICES.Users.name,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICES.Users.host,
          port: MICROSERVICES.Users.port,
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
