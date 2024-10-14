import { Router } from 'express'
import { TodoRoutes } from '../todos/routes'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api/todos', TodoRoutes.routes)
    return router
  }
}
