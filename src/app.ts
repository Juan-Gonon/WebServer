import { envs } from './config/envs'
import { Server } from './presentation/server'

void (
  async (): Promise<void> => {
    await main()
  }
)()

async function main (): Promise<void> {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH
  })
  await server.start()
}
