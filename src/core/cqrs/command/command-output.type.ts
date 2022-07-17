import { Command } from './command'

export type CommandOutput<ICommand extends Command<unknown, unknown>> = ICommand['_output']
