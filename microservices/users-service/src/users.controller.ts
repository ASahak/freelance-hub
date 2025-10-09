import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '@/users.service'
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: 'uploadAvatar' })
  async uploadAvatar(@Payload() { id, avatarUrl }: { id: string, avatarUrl: string }): Promise<User> {
    return await this.usersService.update(id, {
      avatarUrl
    })
  }

  @MessagePattern({ cmd: 'getAll' })
  async getAll() {
    const users = await this.usersService.findAll()
    return users.map((user) => user)
  }

  @MessagePattern({ cmd: 'findUser' })
  async findUser(@Payload() id: string) {
    return await this.usersService.findOne({ id })
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(
    @Payload() { id, data }: { id: string, data: Partial<User>}
  ) {
    return await this.usersService.update(id, data)
  }

  @MessagePattern({ cmd: 'removeUser' })
  async removeUser(@Payload() id: string) {
    return await this.usersService.remove(id)
  }
}
