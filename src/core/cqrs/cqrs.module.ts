import { Global, Module } from '@nestjs/common'
import { CommandBus } from './commands/command-bus'

@Module({
  providers: [CommandBus],
  exports: [CommandBus],
})
@Global()
export class CqrsModule {}
