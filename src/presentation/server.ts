import express, { Router } from 'express'
import path from 'path'

interface Options {
  port: number
  publicPath?: string
  routes: Router
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor (options: Options) {
    const { port, publicPath = 'public', routes } = options

    this.port = port
    this.publicPath = publicPath
    this.routes = routes
  }

  async start (): Promise<void> {
    // Middlewares

    // public Folder
    this.app.use(express.static(this.publicPath))

    // * Routes
    this.app.use(this.routes)

    // SPA
    this.app.get('*', (req, res) => {
    //   console.log(req.url)
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)

      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () => {
      console.log('Server running on port 3000')
    })
  }
}
