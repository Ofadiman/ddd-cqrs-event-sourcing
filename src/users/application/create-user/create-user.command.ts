import { AbstractCommand } from '../../../core/cqrs/commands'

type CreateUserCommandInput = {
  readonly name: string
  readonly email: string
  readonly password: string
}

type CreateUserCommandOutput = {
  readonly id: string
}

export class CreateUserCommand extends AbstractCommand<
  CreateUserCommandInput,
  CreateUserCommandOutput
> {}
