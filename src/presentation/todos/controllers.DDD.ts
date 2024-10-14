/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { CreateTodoDto, UpdateTodoDTO } from '../../domain/DTOs'
import { TodoRepository } from '../../domain'

export class TodosController {
  // DI
  constructor (
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    const todos = await this.todoRepository.getAll()
    return res.json(todos)
  }

  public getTodosById = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    try {
      const todo = await this.todoRepository.findById(id)
      return res.json(todo)
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message })
    }
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error) return res.status(400).json({ error })

    const todo = await this.todoRepository.create(createTodoDto!)

    return res.json(todo)
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id })

    if (error) return res.status(400).json({ error })

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)

    return res.json(updatedTodo)
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const deletedTodo = await this.todoRepository.deleteById(id)

    return res.json(deletedTodo)
  }
}
