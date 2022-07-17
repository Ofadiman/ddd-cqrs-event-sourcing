import { UserAggregateEventEnum } from '../user.aggregate'
import { DomainEvent } from '../../../core/ddd/domain-event'

export type PasswordChangedEventPayload = {
  newPasswordHash: string
}

export class PasswordChangedEvent extends DomainEvent<
  UserAggregateEventEnum.PasswordChanged,
  PasswordChangedEventPayload
> {
  public constructor(payload: PasswordChangedEventPayload) {
    super(UserAggregateEventEnum.PasswordChanged, payload)
  }
}
