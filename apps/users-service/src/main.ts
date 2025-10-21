import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { MICROSERVICES } from '@libs/constants/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: MICROSERVICES.Users.host,
      port: MICROSERVICES.Users.port,
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
