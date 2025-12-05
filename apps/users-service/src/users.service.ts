import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ROUNDS_OF_HASHING } from './common/constants/global';
import { UserRepository } from './repositories/user.repository';
import { SessionRepository } from './repositories/session.repository';
import { User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async create(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, ROUNDS_OF_HASHING);
    }

    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(where: {
    id?: string;
    email?: string;
    passwordResetTokenHash?: string;
  }) {
    return this.userRepository.findOne(where);
  }

  async update(id: string, updateUserDto: Partial<User>) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        ROUNDS_OF_HASHING,
      );
    }

    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }

  async findUserByRefreshToken(hashedToken: string) {
    return this.userRepository.findOne({ refreshToken: hashedToken });
  }

  async createSession(data: { userId: string; refreshToken: string; ip?: string; userAgent?: string }) {
    return this.sessionRepository.create({
      user: { connect: { id: data.userId } },
      refreshToken: data.refreshToken,
      ipAddress: data.ip,
      userAgent: data.userAgent,
    });
  }

  /**
   * Finds a session by the refresh token hash.
   */
  async findSessionByHash(refreshToken: string) {
    return this.sessionRepository.findOne({ refreshToken });
  }

  /**
   * Gets all sessions for a user (for the "Active Sessions" list).
   */
  async getUserSessions(userId: string) {
    return this.sessionRepository.findAllByUserId(userId);
  }

  /**
   * Deletes a specific session.
   * CRITICAL: We must verify the session belongs to the user requesting the delete.
   */
  async deleteSession(sessionId: string, userId: string) {
    const session = await this.sessionRepository.findOne({ id: sessionId });

    if (!session) {
      throw new RpcException(new NotFoundException('Session not found'));
    }

    if (session.userId !== userId) {
      // If the session exists but belongs to someone else, do not delete it.
      // Throwing NotFound is safer than Forbidden to avoid leaking info.
      throw new RpcException(new NotFoundException('Session not found'));
    }

    return this.sessionRepository.remove(sessionId);
  }

  /**
   * Deletes all sessions for a user EXCEPT the current one.
   * Used for "Log out of all other devices".
   */
  async deleteAllOtherSessions(userId: string, currentSessionId: string) {
    // This delegates to the custom method we added to SessionRepository
    return this.sessionRepository.deleteManyExclude(userId, currentSessionId);
  }
}
