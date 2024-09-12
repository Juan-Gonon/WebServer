import { Server } from './presentation/server'

void (
  async (): Promise<void> => {
    await main()
  }
)()

async function main (): Promise<void> {
  const server = new Server()
  await server.start()
}
