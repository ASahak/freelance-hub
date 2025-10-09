import { NestFactory } from '@nestjs/core';
import { UsersModule } from '@/users.module';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()
async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: configService.get('host'),
      port: configService.get('port'),
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
