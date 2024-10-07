import { CreateTodoDto, UpdateTodoDTO } from '../DTOs'
import { TodoEntity } from '../entities/todo.entity'

export abstract class TodoDataSource {
  abstract create (createTodoDTO: CreateTodoDto): Promise<TodoEntity>

  // todo: pagination
  abstract getAll (): Promise<TodoEntity>

  abstract findById (id: number): Promise<TodoEntity>
  abstract updateById (UpdateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>
  abstract deleteById (id: number): Promise<TodoEntity>
}
