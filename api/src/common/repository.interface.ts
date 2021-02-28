export interface IRepository<DTO, Entity> {
  create(dto: DTO): Promise<Entity>;
  getAll(): Promise<Array<Entity>>;
  getById(id: string): Promise<Entity>;
  update(id: string, dto: DTO): Promise<Entity>;
  delete(id: string): Promise<boolean>;
}
