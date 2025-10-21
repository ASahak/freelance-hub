import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@libs/constants/microservices';
import configuration from './config/configuration';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './apps/users-service/.env',
    }),
    ClientsModule.register([
      {
        name: MICROSERVICES.Auth.name,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICES.Auth.host,
          port: MICROSERVICES.Auth.port,
        },
      },
    ]),
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
