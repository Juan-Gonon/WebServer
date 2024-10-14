import { envs } from './config/envs'
import { AppRoutes } from './presentation/router/routes'
import { Server } from './presentation/server'

void (
  async (): Promise<void> => {
    await main()
  }
)()

async function main (): Promise<void> {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })
  await server.start()
}
