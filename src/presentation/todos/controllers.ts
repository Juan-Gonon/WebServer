/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
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

    const todo = await prisma.todo.create({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: createTodoDto!
    })

    return res.json(todo)
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id })

    if (error) return res.status(400).json({ error })

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await prisma.todo.findFirst({ where: { id } })
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

    // const { text, completedAt } = req.body
    // // if (!text) res.status(400).json({ error: 'Text property is required' })

    const updateTodo = await prisma.todo.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data: updateTodoDto!.values
    })

    return res.json(updateTodo)
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await prisma.todo.findFirst({ where: { id } })
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
    // todos.splice(todos.indexOf(todo), 1)
    const deleted = await prisma.todo.delete({ where: { id } })

    if (!deleted) {
      return res.status(400).json({ error: `Todo with id ${id} not found` })
    }

    return res.json(deleted)
  }
}
