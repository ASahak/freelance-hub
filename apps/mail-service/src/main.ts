import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { MailModule } from './mail.module';
import { HttpToRpcExceptionFilter } from './common/filters/http-to-rpc-exception.filter';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(MailModule);
  const configService = appContext.get(ConfigService);

  const user = configService.get<string>('rabbitMQ.user');
  const pass = configService.get<string>('rabbitMQ.password');
  const host = configService.get<string>('rabbitMQ.host');
  const port = configService.get<string>('rabbitMQ.port');
  const queue = configService.get<string>('rabbitMQ.queueToken');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${pass}@${host}:${port}`],
        queue: queue,
        queueOptions: { durable: true },
        // Important: Manual Acknowledgement
        // This ensures if sending email crashes, the message isn't lost.
        noAck: false,
      },
    },
  );

  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  await app.listen();
  await appContext.close();
}
bootstrap();
