import { Router } from 'express'
import { TodosController } from './controllers'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
  static get routes (): Router {
    const router = Router()

    const todoController = new TodosController()

    router.get('/', todoController.getTodos)
    return router
  }
}
