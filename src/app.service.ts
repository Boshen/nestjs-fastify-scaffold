import { Injectable, Inject } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class AppService {
  constructor(@Inject(REQUEST) private readonly req: any) {}

  getHello(): string {
    return 'Hello World!'
  }
}
