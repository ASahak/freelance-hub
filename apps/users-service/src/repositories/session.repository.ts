import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../modules/prisma/prisma.service';
import { Prisma, Session, User } from '@prisma/client';

@Injectable()
export class SessionRepository extends BaseRepository<
  Session,
  Prisma.SessionWhereUniqueInput,
  Prisma.SessionCreateInput,
  Prisma.SessionUpdateInput
> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected readonly delegate = this.prisma.session;

  async deleteMany(where: Prisma.SessionWhereInput) {
    return this.delegate.deleteMany({
      where,
    });
  }

  async findUser(
    sessionId: string,
  ): Promise<(Session & { user: User }) | null> {
    return this.delegate.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
  }

  async findAllByUserId(userId: string): Promise<Session[]> {
    return this.delegate.findMany({
      where: { userId },
      orderBy: { lastActive: 'desc' },
    });
  }

  async deleteManyExclude(userId: string, excludeSessionId: string) {
    return this.delegate.deleteMany({
      where: {
        userId,
        id: { not: excludeSessionId },
      },
    });
  }
}
