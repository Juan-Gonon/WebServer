import express from 'express'
import path from 'path'

interface Options {
  port: number
  publicPath?: string
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string

  constructor (options: Options) {
    const { port, publicPath = 'public' } = options

    this.port = port
    this.publicPath = publicPath
  }

  async start (): Promise<void> {
    // Middlewares

    // public Folder
    this.app.use(express.static(this.publicPath))

    // * Routes
    this.app.get('/api/todos', (req, res) => {
      return res.json([
        { id: 1, text: 'Buy milk', createAt: new Date() },
        { id: 2, text: 'Buy milk', createAt: null },
        { id: 3, text: 'Buy milk', createAt: new Date() }
      ])
    })

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
