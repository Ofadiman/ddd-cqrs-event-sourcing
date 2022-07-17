import { Command } from '../../../core/cqrs/command/command'

type ChangeUserPasswordCommandInput = {
  userId: string
  plainPassword: string
}

export class ChangeUserPasswordCommand extends Command<ChangeUserPasswordCommandInput, void> {}
