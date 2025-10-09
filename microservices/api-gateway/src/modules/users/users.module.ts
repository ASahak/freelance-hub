import { Module } from '@nestjs/common';
import { UsersProxyModule } from '@/users-proxy/users-proxy.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    UsersProxyModule
  ],
  controllers: [UsersController],
})
export class UsersModule {}