import { Global, Module } from '@nestjs/common'
import { CommandBus } from './commands/command-bus'
import { QueryBus } from './query/query-bus'

@Module({
  providers: [CommandBus, QueryBus],
  exports: [CommandBus, QueryBus],
})
@Global()
export class CqrsModule {}
