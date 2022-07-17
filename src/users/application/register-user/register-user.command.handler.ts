import { RegisterUserCommand } from './register-user.command'
import { UserAggregateRepository } from '../../infrastructure/user.aggregate.repository'
import { UserPasswordService } from '../../infrastructure/user.password.service'
import { UserAggregate } from '../../domain/user.aggregate'
import { CommandHandler } from '../../../core/cqrs/commands/command-handler.decorator'
import { ICommandHandler } from '../../../core/cqrs/commands/command-handler.type'
import { CommandOutput } from '../../../core/cqrs/commands/command-output.type'

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  public constructor(
    private readonly userAggregateRepository: UserAggregateRepository,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  public async handle(command: RegisterUserCommand): Promise<CommandOutput<RegisterUserCommand>> {
    const isEmailAvailable = await this.userAggregateRepository.isEmailAvailable(
      command.input.email,
    )

    const passwordHash = await this.userPasswordService.hash(command.input.password)

    const userAggregate = new UserAggregate()

    userAggregate.register({
      isEmailAvailable,
      newUserDetails: {
        name: command.input.name,
        email: command.input.email,
        passwordHash: passwordHash,
      },
    })

    const snapshotId = await this.userAggregateRepository.save(userAggregate)

    return {
      id: snapshotId,
    }
  }
}
