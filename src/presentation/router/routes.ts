import { Router } from 'express'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.get('/api/todos', (req, res) => {
      return res.json([
        { id: 1, text: 'Buy milk', createAt: new Date() },
        { id: 2, text: 'Buy milk', createAt: null },
        { id: 3, text: 'Buy milk', createAt: new Date() }
      ])
    })
    return router
  }
}
