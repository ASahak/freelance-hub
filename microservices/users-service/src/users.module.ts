import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { UsersController } from '@/users.controller'
import { UserRepository } from '@/repositories/user.repository'

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [PrismaModule],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
