import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { MICROSERVICES } from '@libs/constants/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: MICROSERVICES.Auth.host,
      port: MICROSERVICES.Auth.port,
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
