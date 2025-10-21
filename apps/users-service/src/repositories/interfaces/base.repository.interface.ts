export abstract class IBaseRepository<T, WhereInput, CreateInput, UpdateInput> {
  abstract findAll(): Promise<T[]>;

  abstract findOne(params: WhereInput): Promise<T | null>;

  abstract findOneById(id: string): Promise<T | null>;

  abstract create(item: CreateInput): Promise<T>;

  abstract update(id: string, item: UpdateInput);

  abstract remove(id: string): Promise<any>;
}
