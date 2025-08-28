import { Injectable } from '@nestjs/common'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } })
  }
}
