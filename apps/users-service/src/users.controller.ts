import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { type User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'uploadAvatar' })
  async uploadAvatar(
    @Payload() { id, avatarUrl }: { id: string; avatarUrl: string },
  ): Promise<User> {
    return await this.usersService.update(id, {
      avatarUrl,
    });
  }

  @MessagePattern({ cmd: 'setTwoFactorSecret' })
  setTwoFactorSecret(@Payload() data: { userId: string; secret: string }) {
    return this.usersService.update(data.userId, {
      twoFactorSecret: data.secret,
    });
  }

  @MessagePattern({ cmd: 'enableTwoFactor' })
  enableTwoFactor(@Payload() data: { userId: string }) {
    return this.usersService.update(data.userId, { isTwoFactorEnabled: true });
  }

  @MessagePattern({ cmd: 'getAll' })
  async getAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => user);
  }

  @MessagePattern({ cmd: 'findUser' })
  async findUser(@Payload() { id, email }: { id?: string; email?: string }) {
    return await this.usersService.findOne({ id, email });
  }

  @MessagePattern({ cmd: 'create' })
  async create(@Payload() data: User) {
    return await this.usersService.create(data);
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(
    @Payload() { id, data }: { id: string; data: Partial<User> },
  ) {
    return await this.usersService.update(id, data);
  }

  @MessagePattern({ cmd: 'removeUser' })
  async removeUser(@Payload() id: string) {
    return await this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'setRefreshToken' })
  setRefreshToken(@Payload() data: { userId: string; refreshToken: string }) {
    return this.usersService.setRefreshToken(data.userId, data.refreshToken);
  }

  @MessagePattern({ cmd: 'clearRefreshToken' })
  clearRefreshToken(@Payload() data: { userId: string }) {
    return this.usersService.clearRefreshToken(data.userId);
  }

  @MessagePattern({ cmd: 'findUserByRefreshToken' })
  findUserByRefreshToken(@Payload() data: { refreshToken: string }) {
    return this.usersService.findUserByRefreshToken(data.refreshToken);
  }
}
