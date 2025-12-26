import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PrismaService } from '../modules/prisma/prisma.service';
import { Prisma, Profile } from '@prisma/client';
import { UpdateProfileDto } from '@libs/dto/update-profile.dto';

@Injectable()
export class ProfileRepository extends BaseRepository<
  Profile,
  Prisma.ProfileWhereUniqueInput,
  Prisma.ProfileCreateInput,
  Prisma.ProfileUpdateInput
> {
  constructor(prisma: PrismaService) {
    // Pass the prisma client to the parent class
    super(prisma);
  }

  protected readonly delegate = this.prisma.profile;

  async findByUserId(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: {
        skills: true,
        experiences: true,
        projects: true,
      },
    });
  }

  async upsert(userId: string, data: UpdateProfileDto): Promise<Profile> {
    const { skills, ...scalarData } = data;

    let skillIds: { id: string }[] = [];

    if (skills && skills.length > 0) {
      skillIds = await Promise.all(
        skills.map(async (name) => {
          const skill = await this.prisma.skill.upsert({
            where: { name },
            update: {}, // If exists, do nothing
            create: { name }, // If missing, create it
          });
          return { id: skill.id };
        }),
      );
    }

    return this.prisma.profile.upsert({
      where: { userId },
      update: {
        ...scalarData,
        // Only update skills if the array was provided (not undefined)
        ...(skills && {
          skills: {
            // 'set' replaces the entire list with the new IDs.
            // This automatically handles disconnecting removed skills.
            set: skillIds,
          },
        }),
      },
      create: {
        userId,
        ...scalarData,
        skills: {
          // In create, we can just connect the IDs we found/created
          connect: skillIds,
        },
      },
      include: {
        skills: true,
      },
    });
  }
}
