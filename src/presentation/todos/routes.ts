/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { TodosController } from './controllers'
import { TodoDatasourceImpl } from '../../infrastructure/datasources/todo.datasource.impl'
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repsotory.impl'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
  static get routes (): Router {
    const router = Router()
    const datasource = new TodoDatasourceImpl()
    const repository = new TodoRepositoryImpl(datasource)

    const todoController = new TodosController(repository)

    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodosById)
    router.post('/', todoController.createTodo)
    router.put('/:id', todoController.updateTodo)
    router.delete('/:id', todoController.deleteTodo)

    return router
  }
}
