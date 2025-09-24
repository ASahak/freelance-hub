import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '@/modules/prisma/prisma.service'
import { ROUNDS_OF_HASHING } from '@/common/constants/auth'
import { Prisma } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        ROUNDS_OF_HASHING
      )
    }

    return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        ROUNDS_OF_HASHING
      )
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
