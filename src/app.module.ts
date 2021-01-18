import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {}

  onApplicationBootstrap() {
    console.log(this.appService) // undefined, can we warn about this?
  }
}
