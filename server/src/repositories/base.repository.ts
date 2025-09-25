import { PrismaService } from '@/modules/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { IBaseRepository } from '@/repositories/interfaces/base.repository.interface'
import { IDelegate } from '@/repositories/interfaces/delegate.interface'

@Injectable()
export abstract class BaseRepository<T, WhereInput, CreateInput, UpdateInput>
  implements IBaseRepository<T, WhereInput, CreateInput, UpdateInput>
{
  protected abstract readonly delegate: IDelegate<
    T,
    WhereInput,
    CreateInput,
    UpdateInput
  >

  constructor(protected readonly prisma: PrismaService) {}

  findAll(): Promise<T[]> {
    return this.delegate.findMany()
  }

  findOne(where: WhereInput): Promise<T | null> {
    return this.delegate.findUnique({ where })
  }

  create(data: CreateInput): Promise<T> {
    return this.delegate.create({ data })
  }

  update(id: string, data: UpdateInput): Promise<T> {
    return this.delegate.update({ where: { id }, data })
  }

  remove(id: string): Promise<T> {
    return this.delegate.delete({ where: { id } })
  }

  findOneById(id: string): Promise<T | null> {
    return this.delegate.findUnique({ where: { id } as WhereInput })
  }
}
