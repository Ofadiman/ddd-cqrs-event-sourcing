import { Global, Module } from '@nestjs/common'
import { CommandBus } from './commands'

@Module({
  providers: [CommandBus],
  exports: [CommandBus],
})
@Global()
export class CqrsModule {}
