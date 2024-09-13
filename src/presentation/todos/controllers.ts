import { Request, Response } from 'express'

export class TodosController {
  // DI
  constructor () {}

  public getTodos = (req: Request, res: Response): void => {
    res.json([
      { id: 1, text: 'Buy milk', createAt: new Date() },
      { id: 2, text: 'Buy milk', createAt: null },
      { id: 3, text: 'Buy milk', createAt: new Date() }
    ])
  }
}
