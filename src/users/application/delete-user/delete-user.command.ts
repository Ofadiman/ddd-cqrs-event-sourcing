import { Command } from '../../../core/cqrs/command/command'

type DeleteUserCommandInput = {
  userId: string
}

export class DeleteUserCommand extends Command<DeleteUserCommandInput, void> {}
