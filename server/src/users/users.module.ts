import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { UsersController } from '@/users/users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
