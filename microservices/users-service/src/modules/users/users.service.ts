import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@/modules/auth/dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ROUNDS_OF_HASHING } from '@/common/constants/auth'
import { UserRepository } from '@/repositories/user.repository'

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        ROUNDS_OF_HASHING
      )
    }

    return this.userRepository.create(createUserDto)
  }

  findAll() {
    return this.userRepository.findAll()
  }

  findOne(where: { id?: string; email?: string }) {
    return this.userRepository.findOne(where)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        ROUNDS_OF_HASHING
      )
    }

    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: string) {
    return this.userRepository.remove(id)
  }
}
