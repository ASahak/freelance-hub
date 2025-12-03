import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { MailModule } from './mail.module';
import { MICROSERVICES } from '@libs/constants/microservices';
import { HttpToRpcExceptionFilter } from './common/filters/http-to-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MailModule, {
    transport: Transport.TCP,
    options: {
      host: MICROSERVICES.Mail.host,
      port: MICROSERVICES.Mail.port,
    },
  } as TcpOptions);
  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  await app.listen();
}
bootstrap();
