import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { UsersController } from '@/modules/users/users.controller'
import { FilesModule } from '@/modules/files/files.module'
import { UserRepository } from '@/repositories/user.repository'

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [PrismaModule, FilesModule],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
