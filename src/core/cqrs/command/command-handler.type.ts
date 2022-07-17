import { Command } from './command'
import { CommandOutput } from './command-output.type'

export type ICommandHandler<ICommand extends Command<unknown, unknown>> = {
  handle(command: ICommand): Promise<CommandOutput<ICommand>>
}
