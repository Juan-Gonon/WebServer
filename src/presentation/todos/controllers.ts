/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Buy milk', completedAt: new Date() },
  { id: 2, text: 'Buy milk', completedAt: null },
  { id: 3, text: 'Buy milk', completedAt: new Date() }
]

export class TodosController {
  // DI
  // constructor () {}

  public getTodos = (req: Request, res: Response): Response => {
    return res.json(todos)
  }

  public getTodosById = (req: Request, res: Response): Response => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const todo = todos.find((todo) => todo.id === id)
    return (todo !== undefined) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
  }

  public createTodo = (req: Request, res: Response): void => {
    const { text } = req.body

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!text) res.status(400).json({ error: 'Text property is required' })

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null

    }

    todos.push(newTodo)
    res.json(newTodo)
  }

  public updateTodo = (req: Request, res: Response): Response | undefined => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find((todo) => todo.id === id)
    if (!(todo !== undefined)) return res.status(404).json({ error: `Todo with id ${id} not found` })

    const { text, completedAt } = req.body
    // if (!text) res.status(400).json({ error: 'Text property is required' })

    todo.text = text || todo.text;

    (completedAt === 'null')
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt)

    res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response): Response | undefined => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find((todo) => todo.id === id)
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })
    todos.splice(todos.indexOf(todo), 1)
    res.json(todo)
  }
}
