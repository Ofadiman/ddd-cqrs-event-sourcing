import { Command } from '../../../core/cqrs/commands/command'

type CreateUserCommandInput = {
  readonly name: string
  readonly email: string
  readonly password: string
}

type CreateUserCommandOutput = {
  readonly id: string
}

export class CreateUserCommand extends Command<CreateUserCommandInput, CreateUserCommandOutput> {}
