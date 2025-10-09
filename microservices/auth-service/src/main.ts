import { NestFactory } from '@nestjs/core';
import { AuthModule } from '@/auth.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { MICROSERVICES } from '@shared/constants/microservices';

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
