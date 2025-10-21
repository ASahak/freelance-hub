import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { MICROSERVICES } from '@libs/constants/microservices';
import { HttpToRpcExceptionFilter } from './common/filters/http-to-rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: MICROSERVICES.Auth.host,
      port: MICROSERVICES.Auth.port,
    },
  } as TcpOptions);
  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  await app.listen();
}
bootstrap();
