import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!'
  }

  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    console.log('triggerd cron')
    throw new Error('Error')
  }
}
