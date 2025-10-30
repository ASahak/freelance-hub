import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { type User } from '@prisma/client';
import { MICROSERVICES } from '@libs/constants/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(MICROSERVICES.Auth.name) private readonly authClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'registerUser' })
  async register(@Payload() registerUser: User) {
    const user = await this.usersService.register(registerUser);
    const accessToken = await firstValueFrom(
      this.authClient.send(
        { cmd: 'signJwt' },
        {
          email: user.email,
          id: user.id,
        },
      ),
    );

    return { user, accessToken };
  }

  @MessagePattern({ cmd: 'uploadAvatar' })
  async uploadAvatar(
    @Payload() { id, avatarUrl }: { id: string; avatarUrl: string },
  ): Promise<User> {
    return await this.usersService.update(id, {
      avatarUrl,
    });
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

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: User) {
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
  setRefreshToken(@Payload() data: { userId: string; hashedToken: string }) {
    return this.usersService.setRefreshToken(data.userId, data.hashedToken);
  }

  @MessagePattern({ cmd: 'clearRefreshToken' })
  clearRefreshToken(@Payload() data: { userId: string }) {
    return this.usersService.clearRefreshToken(data.userId);
  }

  // @MessagePattern({ cmd: 'findUserByRefreshTokenHash' })
  // findUserByRefreshTokenHash(@Payload() data: { hashedToken: string }) {
  //   return this.usersService.findUserByRefreshTokenHash(data.hashedToken);
  // }
}
