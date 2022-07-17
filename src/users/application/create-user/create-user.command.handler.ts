import { CreateUserCommand } from './create-user.command'
import { UserAggregateRepository } from '../../infrastructure/user.aggregate.repository'
import { UserPasswordService } from '../../infrastructure/user.password.service'
import { UserAggregate } from '../../domain/user.aggregate'
import { CommandHandler, CommandOutput, Handler } from '../../../core/cqrs/commands'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements Handler<CreateUserCommand> {
  public constructor(
    private readonly userAggregateRepository: UserAggregateRepository,
    private readonly userPasswordService: UserPasswordService,
  ) {}

  public async handle(command: CreateUserCommand): Promise<CommandOutput<CreateUserCommand>> {
    const passwordHash = await this.userPasswordService.hash(command.input.password)

    const userAggregate = new UserAggregate()

    userAggregate.create({
      name: command.input.name,
      email: command.input.email,
      passwordHash: passwordHash,
    })

    const snapshotId = await this.userAggregateRepository.save(userAggregate)

    return {
      id: snapshotId,
    }
  }
}