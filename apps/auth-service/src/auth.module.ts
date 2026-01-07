import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import {
  ClientsModule,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES_IN } from '@libs/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';
import configuration from './config/configuration';
import { SessionCleanupService } from './common/services/sessions-cleanup.service';

const MailServiceProvider: ClientsProviderAsyncOptions = {
  name: MICROSERVICES.Mail.name,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const user = configService.get<string>('rabbitMQ.user');
    const pass = configService.get<string>('rabbitMQ.password');
    const host = configService.get<string>('rabbitMQ.host');
    const port = configService.get<string>('rabbitMQ.port');
    const queue = configService.get<string>('rabbitMQ.queueToken');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${pass}@${host}:${port}`],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  },
};

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './apps/auth-service/.env',
    }),
    PassportModule,
    ClientsModule.registerAsync([
      MailServiceProvider,
      {
        name: MICROSERVICES.Users.name,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: MICROSERVICES.Users.host,
            port: MICROSERVICES.Users.port,
          },
        }),
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
