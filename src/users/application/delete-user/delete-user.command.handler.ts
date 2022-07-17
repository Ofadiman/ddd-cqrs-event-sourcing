import { ICommandHandler } from '../../../core/cqrs/commands/command-handler.type'
import { DeleteUserCommand } from './delete-user.command'
import { CommandHandler } from '../../../core/cqrs/commands/command-handler.decorator'
import { CommandOutput } from '../../../core/cqrs/commands/command-output.type'
import { UserAggregateRepository } from '../../infrastructure/user.aggregate.repository'
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception'

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  public constructor(private readonly userAggregateRepository: UserAggregateRepository) {}

  public async handle(command: DeleteUserCommand): Promise<CommandOutput<DeleteUserCommand>> {
    const userAggregate = await this.userAggregateRepository.getById(command.input.userId)

    if (userAggregate === undefined) {
      throw new UserNotFoundException({ userId: command.input.userId })
    }

    userAggregate.delete()

    await this.userAggregateRepository.save(userAggregate)
  }
}
