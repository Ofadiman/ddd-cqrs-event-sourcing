import { Command } from '../../../core/cqrs/commands/command'

type ChangeUserPasswordCommandInput = {
  userId: string
  plainPassword: string
}

export class ChangeUserPasswordCommand extends Command<ChangeUserPasswordCommandInput, void> {}
