import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES_IN } from '@libs/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';
import configuration from './config/configuration';
import { SessionCleanupService } from './common/services/sessions-cleanup.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
        secret: configService.get<string>('jwtAccessTokenSecret'),
        signOptions: {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionCleanupService],
})
export class AuthModule {}
