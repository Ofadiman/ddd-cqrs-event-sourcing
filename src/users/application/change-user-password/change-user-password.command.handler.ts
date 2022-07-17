import { ICommandHandler } from '../../../core/cqrs/commands/command-handler.type'
import { ChangeUserPasswordCommand } from './change-user-password.command'
import { CommandHandler } from '../../../core/cqrs/commands/command-handler.decorator'
import { CommandOutput } from '../../../core/cqrs/commands/command-output.type'
import { UserAggregateRepository } from '../../infrastructure/user.aggregate.repository'
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception'
import { UserPasswordService } from '../../infrastructure/user.password.service'

@CommandHandler(ChangeUserPasswordCommand)
export class ChangeUserPasswordCommandHandler
  implements ICommandHandler<ChangeUserPasswordCommand>
{
  public constructor(
    private readonly userAggregateRepository: UserAggregateRepository,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  public async handle(
    command: ChangeUserPasswordCommand,
  ): Promise<CommandOutput<ChangeUserPasswordCommand>> {
    const userAggregate = await this.userAggregateRepository.getById(command.input.userId)

    if (!userAggregate) {
      throw new UserNotFoundException({ userId: command.input.userId })
    }

    const hashedPassword = await this.userPasswordService.hash(command.input.plainPassword)
    const passwordStrength = await this.userPasswordService.getStrength(command.input.plainPassword)

    userAggregate.changePassword({
      passwordStrength,
      plainPassword: command.input.plainPassword,
      hashedPassword,
    })

    await this.userAggregateRepository.save(userAggregate)
  }
}
