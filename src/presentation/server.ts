import express from 'express'
import path from 'path'

export class Server {
  private readonly app = express()

  async start (): Promise<void> {
    // Middlewares

    // public Folder
    this.app.use(express.static('public'))

    this.app.get('*', (req, res) => {
    //   console.log(req.url)
      const indexPath = path.join(__dirname + '../../../public/index.html')

      res.sendFile(indexPath)
    })

    this.app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  }
}
