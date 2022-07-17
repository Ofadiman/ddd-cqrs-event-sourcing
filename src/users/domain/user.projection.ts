import { v4 } from 'uuid'
import { UserAggregateEventEnum } from './user.aggregate'
import { UserAggregateState } from './user.aggregate.state'
import { DomainEvent } from '../../core/ddd/domain-event'
import { UserRegisteredEvent } from './events/user-registered.event'
import { PasswordChangedEvent } from './events/password-changed.event'
import { UserDeletedEvent } from './events/user-deleted.event'

export type Projection<State, Event extends DomainEvent<string, unknown>> = {
  project: (event: Event, currentState: State | null) => State
}

export class UserProjection
  implements
    Projection<UserAggregateState, UserRegisteredEvent | PasswordChangedEvent | UserDeletedEvent>
{
  public project(
    event: UserRegisteredEvent | PasswordChangedEvent | UserDeletedEvent,
    currentState: UserAggregateState | null,
  ): UserAggregateState {
    if (event.name === UserAggregateEventEnum.Registered) {
      return {
        id: v4(),
        version: 1,

        createdAt: event.createdAt,
        updatedAt: event.createdAt,
        deletedAt: null,

        name: event.payload.name,
        email: event.payload.email,
        passwordHash: event.payload.passwordHash,
      }
    }

    if (currentState === null) {
      throw new Error(`Current state cannot equal null here.`)
    }

    switch (event.name) {
      case UserAggregateEventEnum.PasswordChanged: {
        return {
          id: currentState.id,
          version: currentState.version + 1,

          createdAt: currentState.createdAt,
          updatedAt: event.createdAt,
          deletedAt: currentState.deletedAt,

          name: currentState.name,
          email: currentState.email,
          passwordHash: event.payload.newPasswordHash,
        }
      }

      case UserAggregateEventEnum.Deleted: {
        return {
          id: currentState.id,
          version: currentState.version + 1,

          createdAt: currentState.createdAt,
          updatedAt: event.createdAt,
          deletedAt: event.createdAt,

          name: currentState.name,
          email: currentState.email,
          passwordHash: currentState.passwordHash,
        }
      }
    }
  }
}
