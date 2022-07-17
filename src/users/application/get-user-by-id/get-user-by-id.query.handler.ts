import { IQueryHandler } from '../../../core/cqrs/query/query-handler.type'
import { GetUserByIdQuery } from './get-user-by-id.query'
import { QueryHandler } from '../../../core/cqrs/query/query-handler.decorator'
import { QueryOutput } from '../../../core/cqrs/query/query-output.type'
import { UserAggregateRepository } from '../../infrastructure/user.aggregate.repository'
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  public constructor(private readonly userAggregateRepository: UserAggregateRepository) {}

  public async handle(command: GetUserByIdQuery): Promise<QueryOutput<GetUserByIdQuery>> {
    const userAggregate = await this.userAggregateRepository.getById(command.input.userId)

    if (userAggregate === undefined) {
      throw new UserNotFoundException({ userId: command.input.userId })
    }

    return userAggregate.toSnapshot()
  }
}
