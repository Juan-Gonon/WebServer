import express from 'express'

export class Server {
  private readonly app = express()

  async start (): Promise<void> {
    // Middlewares

    // public Folder
    this.app.use(express.static('public'))

    this.app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  }
}
