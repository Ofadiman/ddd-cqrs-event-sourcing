import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const logger = new Logger('Main')

const PORT = 3000 as const

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT)
}

bootstrap()
  .then(() => {
    logger.log(`Application is listening on port: ${PORT} 🚀`)
  })
  .catch((error) => {
    logger.error(`Something went wrong 💥`)
    logger.error(error)
  })
