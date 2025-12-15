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

    const skillConnect = skills?.map((skillName) => ({
      where: { name: skillName },
      create: { name: skillName },
    }));

    // 2. Perform the Upsert
    return this.prisma.profile.upsert({
      where: { userId },
      update: {
        ...scalarData,
        // Only run this logic if 'skillConnect' exists
        ...(skillConnect && {
          skills: {
            set: [], // Reset old skills
            connectOrCreate: skillConnect, // Use the prepared variable
          },
        }),
      },
      create: {
        userId,
        ...scalarData,
        // Only run this logic if 'skillConnect' exists
        ...(skillConnect && {
          skills: {
            connectOrCreate: skillConnect,
          },
        }),
      },
      include: {
        skills: true,
      },
    });
  }
}
