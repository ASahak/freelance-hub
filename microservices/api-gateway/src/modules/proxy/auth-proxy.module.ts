import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MICROSERVICES } from '@shared/constants/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICROSERVICES.Auth.name,
        imports: [ConfigModule],
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: MICROSERVICES.Auth.host,
            port: MICROSERVICES.Auth.port,
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthProxyModule {}