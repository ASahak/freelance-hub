import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { UsersController } from '@/users.controller'
import { UserRepository } from '@/repositories/user.repository'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from '@shared/constants/microservices';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    PrismaModule,
    ClientsModule.register([{
      name: MICROSERVICES.Auth.name,
      transport: Transport.TCP,
      options: { host: MICROSERVICES.Auth.host, port: MICROSERVICES.Auth.port },
    }]),
  ],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
