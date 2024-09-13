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
}
