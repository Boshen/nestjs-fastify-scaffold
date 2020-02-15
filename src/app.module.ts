import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {}

  onApplicationBootstrap() {
    console.log(this.appService) // undefined, can we warn about this?
  }
}
