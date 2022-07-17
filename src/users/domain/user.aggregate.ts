import { UserSnapshot } from '../../database/models/user.snapshot.model'
import { UserProjection } from './user.projection'
import { UserAggregateState } from './user.aggregate.state'
import { UserCreatedEvent } from './events/user-created.event'
import { PasswordChangedEvent } from './events/password-changed.event'
import { UserDeletedEvent } from './events/user-deleted.event'
import { Aggregate } from '../../core/ddd/aggregate'

export enum UserAggregateEventEnum {
  Created = 'created',
  PasswordChanged = 'password_changed',
  Deleted = 'deleted',
}

export class UserAggregate extends Aggregate<
  UserAggregateState,
  UserCreatedEvent | PasswordChangedEvent | UserDeletedEvent
> {
  protected projection = new UserProjection()

  public restore(snapshot: UserSnapshot): void {
    this.state = {
      id: snapshot.id,
      version: snapshot.version,

      updatedAt: snapshot.updated_at,
      deletedAt: snapshot.deleted_at,
      createdAt: snapshot.created_at,

      email: snapshot.email,
      name: snapshot.name,
      passwordHash: snapshot.password_hash,
    }
  }

  public create(args: ConstructorParameters<typeof UserCreatedEvent>[0]) {
    this.emit(
      new UserCreatedEvent({
        name: args.name,
        email: args.email,
        passwordHash: args.passwordHash,
      }),
    )
  }

  public changePassword(args: ConstructorParameters<typeof PasswordChangedEvent>[0]) {
    this.emit(
      new PasswordChangedEvent({
        newPasswordHash: args.newPasswordHash,
      }),
    )
  }

  public delete() {
    this.emit(new UserDeletedEvent())
  }
}
