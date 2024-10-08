/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { prisma } from '../../../data/postgres'
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDTO } from '../../../domain'

export class TodoDatasourceImpl implements TodoDataSource {
  async create (createTodoDTO: CreateTodoDto): Promise<TodoEntity> {
    throw new Error('Method not implemented.')
  }

  async getAll (): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()

    return todos.map((todo) => TodoEntity.fromObject(todo))
  }

  async findById (id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } })

    if (!todo) throw new Error(`Todo with id ${id} not found`)

    return TodoEntity.fromObject(todo)
  }

  async updateById (UpdateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    const todo = await this.findById(UpdateTodoDTO.id)

    const updateTodo = await prisma.todo.update({
      where: { id: todo.id },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: UpdateTodoDTO!.values
    })

    return TodoEntity.fromObject(updateTodo)
  }

  async deleteById (id: number): Promise<TodoEntity> {
    const todo = await this.findById(id)
    const deleted = await prisma.todo.delete({ where: { id: todo.id } })

    return TodoEntity.fromObject(deleted)
  }
}
