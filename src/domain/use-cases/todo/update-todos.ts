import { UpdateTodoDTO } from '../../DTOs'
import { TodoEntity } from '../../entities/todo.entity'
import { TodoRepository } from '../../repositories/todo.repository'

export interface UpdateTodoUseCase {
  execute: (dto: UpdateTodoDTO) => Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor (private readonly repository: TodoRepository) {}

  execute = async (dto: UpdateTodoDTO): Promise < TodoEntity > => {
    return await this.repository.updateById(dto)
  }
}
