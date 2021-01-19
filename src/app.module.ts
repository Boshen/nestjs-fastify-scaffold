import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { GraphQLModule, GraphQLFederationModule } from '@nestjs/graphql'

import { GraphQLLoggingPlugin } from './logging.plugin'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppGateway } from './app.gateway'
import { AuthorsResolver } from './author.resolver'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // GraphQLModule.forRoot({
    // autoSchemaFile: true,
    // }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [GraphQLLoggingPlugin, AppService, AppGateway, AuthorsResolver],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {}

  onApplicationBootstrap() {
    console.log(this.appService) // undefined, can we warn about this?
  }
}
