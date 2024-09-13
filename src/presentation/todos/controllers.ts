import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Buy milk', createAt: new Date() },
  { id: 2, text: 'Buy milk', createAt: null },
  { id: 3, text: 'Buy milk', createAt: new Date() }
]

export class TodosController {
  // DI
  constructor () {}

  public getTodos = (req: Request, res: Response): Response => {
    return res.json(todos)
  }

  public getTodosById = (req: Request, res: Response): Response => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
    const todo = todos.find((todo) => todo.id === id)
    return (todo !== undefined) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
  }
}
