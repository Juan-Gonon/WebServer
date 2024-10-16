import { TodoEntity } from '../../entities/todo.entity'
import { TodoRepository } from '../../repositories/todo.repository'

export interface GetTodoUseCase {
  execute: (id: number) => Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {
  constructor (private readonly repository: TodoRepository) {}

  execute = async (id: number): Promise < TodoEntity > => {
    return await this.repository.findById(id)
  }
}
