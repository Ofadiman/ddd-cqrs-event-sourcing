import { DomainEvent } from '../../../core/ddd/domain-event'
import { UserAggregateEventEnum } from '../user.aggregate'

export type UserCreatedEventPayload = {
  readonly name: string
  readonly email: string
  readonly passwordHash: string
}

export class UserCreatedEvent extends DomainEvent<
  UserAggregateEventEnum.Created,
  UserCreatedEventPayload
> {
  public constructor(payload: UserCreatedEventPayload) {
    super(UserAggregateEventEnum.Created, payload)
  }
}
