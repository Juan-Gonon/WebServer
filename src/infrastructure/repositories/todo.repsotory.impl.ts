import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDTO } from '../../domain'

export class TodoRepositoryImpl implements TodoRepository {
  constructor (private readonly datasource: TodoDataSource) {}
  async create (createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
    return await this.datasource.create(createTodoDTO)
  }

  async getAll (): Promise<TodoEntity[]> {
    return await this.datasource.getAll()
  }

  async findById (id: number): Promise<TodoEntity> {
    return await this.findById(id)
  }

  async updateById (UpdateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return await this.datasource.updateById(UpdateTodoDTO)
  }

  async deleteById (id: number): Promise<TodoEntity> {
    return await this.datasource.deleteById(id)
  }
}
