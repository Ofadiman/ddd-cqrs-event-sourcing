import { UserAggregateEventEnum } from '../user.aggregate'
import { DomainEvent } from '../../../core/ddd/domain-event'

export type UserDeletedEventPayload = {}

export class UserDeletedEvent extends DomainEvent<
  UserAggregateEventEnum.Deleted,
  UserDeletedEventPayload
> {
  public constructor() {
    super(UserAggregateEventEnum.Deleted, {})
  }
}
