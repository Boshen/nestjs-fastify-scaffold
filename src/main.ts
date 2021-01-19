import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
// import * as helmet from 'helmet'

import { AppModule } from './app.module'

declare const module: any

async function bootstrapFastify() {
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

  const options = new DocumentBuilder().setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/', app, document)

  // app.use(helmet()).enableCors()

  app.enableShutdownHooks() // <-- throws "Error [ERR_SERVER_NOT_RUNNING]: Server is not running." when shutting down

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

// @ts-ignore
async function bootstrapExpress() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder().setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/', app, document)

  // app.use(helmet()).enableCors()

  // app.enableShutdownHooks()

  await app.listen(4000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrapFastify()
// bootstrapExpress()
