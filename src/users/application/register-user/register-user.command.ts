import { Command } from '../../../core/cqrs/command/command'

type RegisterUserCommandInput = {
  readonly name: string
  readonly email: string
  readonly password: string
}

type RegisterUserCommandOutput = {
  readonly id: string
}

export class RegisterUserCommand extends Command<
  RegisterUserCommandInput,
  RegisterUserCommandOutput
> {}
