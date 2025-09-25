export interface IDelegate<T, WhereInput, CreateInput, UpdateInput> {
  findUnique(args: { where: WhereInput }): Promise<T | null>
  findMany(): Promise<T[]>
  create(args: { data: CreateInput }): Promise<T>
  update(args: { where: { id: string }; data: UpdateInput }): Promise<T>
  delete(args: { where: { id: string } }): Promise<T>
}
