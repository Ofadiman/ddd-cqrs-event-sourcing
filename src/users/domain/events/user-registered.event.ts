import { DomainEvent } from '../../../core/ddd/domain-event'
import { UserAggregateEventEnum } from '../user.aggregate'

export type UserRegisteredEventPayload = {
  readonly name: string
  readonly email: string
  readonly passwordHash: string
}

export class UserRegisteredEvent extends DomainEvent<
  UserAggregateEventEnum.Registered,
  UserRegisteredEventPayload
> {
  public constructor(payload: UserRegisteredEventPayload) {
    super(UserAggregateEventEnum.Registered, payload)
  }
}
