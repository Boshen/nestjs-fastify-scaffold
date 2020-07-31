import { Test, TestingModule } from '@nestjs/testing'
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { AppController } from './app.controller'

describe('AppController', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = testingModule.createNestApplication<NestFastifyApplication>(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.getHello()).toBe('Hello World!')
    })
  })
})
