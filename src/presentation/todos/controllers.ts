/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { CreateTodoDto, UpdateTodoDTO } from '../../domain/DTOs'
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain'

export class TodosController {
  // DI
  constructor (
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    return await new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error: (error as Error).message }))
  }

  public getTodosById = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    return await new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error: (error as Error).message }))
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (error) return res.status(400).json({ error })

    return await new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error: (error as Error).message }))
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id })

    if (error) return res.status(400).json({ error })

    return await new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(404).json({ error: (error as Error).message }))
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    return await new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error: (error as Error).message }))
  }
}
