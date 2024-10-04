/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { TodosController } from './controllers'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
  static get routes (): Router {
    const router = Router()

    const todoController = new TodosController()

    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodosById)
    router.post('/', todoController.createTodo)
    router.put('/:id', todoController.updateTodo)
    router.delete('/:id', todoController.deleteTodo)

    return router
  }
}
