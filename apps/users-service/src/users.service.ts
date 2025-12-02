import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ROUNDS_OF_HASHING } from './common/constants/global';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

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

  async setRefreshToken(userId: string, hashedToken: string) {
    return this.userRepository.update(userId, {
      refreshToken: hashedToken,
    });
  }

  async clearRefreshToken(userId: string) {
    return this.userRepository.update(userId, { refreshToken: null });
  }

  async findUserByRefreshToken(hashedToken: string) {
    return this.userRepository.findOne({ refreshToken: hashedToken });
  }
}
