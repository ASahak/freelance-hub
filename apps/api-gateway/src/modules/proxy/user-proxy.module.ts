import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MICROSERVICES } from '@libs/constants/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.Users.name,
        imports: [ConfigModule],
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: MICROSERVICES.Users.host,
            port: MICROSERVICES.Users.port,
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class UsersProxyModule {}
