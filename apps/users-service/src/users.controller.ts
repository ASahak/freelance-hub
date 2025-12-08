import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { type User } from '@prisma/client';
import { Session } from '@libs/types/session.type';

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

  @MessagePattern({ cmd: 'disableTwoFactor' })
  disableTwoFactor(@Payload() data: { userId: string }) {
    return this.usersService.update(data.userId, {
      isTwoFactorEnabled: false,
      twoFactorSecret: null,
    });
  }

  @MessagePattern({ cmd: 'removeUser' })
  async removeUser(@Payload() id: string) {
    return await this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'findUserByRefreshToken' })
  findUserByRefreshToken(@Payload() data: { refreshToken: string }) {
    return this.usersService.findUserByRefreshToken(data.refreshToken);
  }

  @MessagePattern({ cmd: 'setPasswordResetToken' })
  setPasswordResetToken(
    @Payload() data: { userId: string; hashedToken: string; expiresAt: Date },
  ) {
    return this.usersService.update(data.userId, {
      passwordResetTokenHash: data.hashedToken,
      passwordResetExpiresAt: data.expiresAt,
    });
  }

  @MessagePattern({ cmd: 'findUserByResetToken' })
  findUserByResetToken(@Payload() data: { hashedToken: string }) {
    return this.usersService.findOne({
      passwordResetTokenHash: data.hashedToken,
    });
  }

  @MessagePattern({ cmd: 'createSession' })
  createSession(@Payload() data: Partial<Session> & { refreshToken: string }) {
    return this.usersService.createSession(data);
  }

  @MessagePattern({ cmd: 'validateSession' })
  async validateSession(@Payload() data: { sessionId: string }) {
    const session = await this.usersService.validateSession(data.sessionId);

    if (!session) {
      return null;
    }

    return session.user;
  }

  @MessagePattern({ cmd: 'findSessionByHash' })
  findSessionByHash(@Payload() data: { refreshToken: string }) {
    return this.usersService.findSessionByHash(data.refreshToken);
  }

  @MessagePattern({ cmd: 'getUserSessions' })
  getUserSessions(@Payload() data: { userId: string }) {
    return this.usersService.getUserSessions(data.userId);
  }

  @MessagePattern({ cmd: 'deleteSession' })
  deleteSession(@Payload() data: { sessionId: string; userId: string }) {
    return this.usersService.deleteSession(data.sessionId, data.userId);
  }

  @MessagePattern({ cmd: 'deleteAllOtherSessions' })
  deleteAllOtherSessions(
    @Payload() data: { userId: string; currentSessionId: string },
  ) {
    return this.usersService.deleteAllOtherSessions(
      data.userId,
      data.currentSessionId,
    );
  }
}
