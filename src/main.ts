import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      ignoreTrailingSlash: true,
      requestIdHeader: 'x-request-id',
      logger: {
        prettyPrint: true,
      },
    })
  )
  await app.listen(3000)
}

bootstrap()
