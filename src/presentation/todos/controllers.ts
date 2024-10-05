/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'
import { CreateTodoDto } from '../../domain/DTOs'

export class TodosController {
  // DI
  // constructor () {}

  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  public getTodosById = async (req: Request, res: Response): Promise<Response> => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const todo = await prisma.todo.findFirst({ where: { id } })
    return (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
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

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = await prisma.todo.findFirst({ where: { id } })
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

    const { text, completedAt } = req.body
    // // if (!text) res.status(400).json({ error: 'Text property is required' })

    const newText = text ?? todo.text
    const newCompletedAt = completedAt === 'null' || completedAt === undefined ? null : new Date(completedAt ?? todo.completedAt)

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: {
        text: newText,
        completedAt: newCompletedAt
      }
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
