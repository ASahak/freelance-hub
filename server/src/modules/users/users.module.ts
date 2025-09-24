import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { UsersController } from '@/modules/users/users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
