import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../modules/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  { id?: string; email?: string; refreshToken?: string },
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(prisma: PrismaService) {
    // Pass the prisma client to the parent class
    super(prisma);
  }

  protected readonly delegate = this.prisma.user;
}
