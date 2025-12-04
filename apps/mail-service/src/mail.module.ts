import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { join } from 'path';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './apps/mail-service/.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('mailHost'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('mailUser'),
            pass: config.get('mailPassword'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@freelancehub.com>',
        },
        template: {
          dir: join(process.cwd(), 'dist', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
