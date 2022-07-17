import { ClassConstructor } from 'class-transformer'
import { COMMAND_HANDLER_METADATA_KEY } from './command-metadata-keys'
import { Command } from './command'
import { CommandOutput } from './command-output.type'

export const CommandHandler = <Input, Output, ICommand extends Command<Input, Output>>(
  command: ClassConstructor<ICommand>,
): (<
  Target extends ClassConstructor<{
    handle(command: ICommand): Promise<CommandOutput<ICommand>>
  }>,
>(
  target: Target,
) => void) => {
  return (target) => {
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA_KEY, command, target.prototype)
  }
}
