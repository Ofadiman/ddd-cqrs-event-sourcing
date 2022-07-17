import { Command } from '../../../core/cqrs/commands/command'

type DeleteUserCommandInput = {
  userId: string
}

export class DeleteUserCommand extends Command<DeleteUserCommandInput, void> {}
