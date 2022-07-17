import { UserSnapshot } from '../../database/models/user.snapshot.model'
import { UserProjection } from './user.projection'
import { UserAggregateState } from './user.aggregate.state'
import { UserRegisteredEvent } from './events/user-registered.event'
import { PasswordChangedEvent } from './events/password-changed.event'
import { UserDeletedEvent } from './events/user-deleted.event'
import { Aggregate } from '../../core/ddd/aggregate'
import { PasswordTooWeakException } from './exceptions/password-too-weak.exception'
import { UserEmailNotAvailableException } from './exceptions/user-email-not-available.exception'

export enum UserAggregateEventEnum {
  Registered = 'registered',
  PasswordChanged = 'password_changed',
  Deleted = 'deleted',
}

export type SerializableAggregate<Snapshot> = {
  toSnapshot: () => Snapshot
  restore: (snapshot: Snapshot) => void
}

export class UserAggregate
  extends Aggregate<
    UserAggregateState,
    UserRegisteredEvent | PasswordChangedEvent | UserDeletedEvent
  >
  implements SerializableAggregate<UserSnapshot>
{
  protected projection = new UserProjection()

  public toSnapshot(): UserSnapshot {
    if (this.state === null) {
      throw new Error('Domain error.')
    }

    return {
      id: this.state.id,
      version: this.state.version,

      created_at: this.state.createdAt,
      updated_at: this.state.updatedAt,
      deleted_at: this.state.deletedAt,

      name: this.state.name,
      email: this.state.email,
      password_hash: this.state.passwordHash,
    }
  }

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

  public register(args: {
    isEmailAvailable: boolean
    newUserDetails: {
      name: string
      email: string
      passwordHash: string
    }
  }) {
    if (!args.isEmailAvailable) {
      throw new UserEmailNotAvailableException(args.newUserDetails.email)
    }

    this.emit(
      new UserRegisteredEvent({
        name: args.newUserDetails.name,
        email: args.newUserDetails.email,
        passwordHash: args.newUserDetails.passwordHash,
      }),
    )
  }

  public changePassword(args: {
    hashedPassword: string
    plainPassword: string
    passwordStrength: number
  }) {
    this.throwOnWeakPassword({
      password: args.plainPassword,
      passwordStrength: args.passwordStrength,
    })

    this.emit(
      new PasswordChangedEvent({
        newPasswordHash: args.hashedPassword,
      }),
    )
  }

  public delete() {
    this.emit(new UserDeletedEvent())
  }

  private throwOnWeakPassword(args: { passwordStrength: number; password: string }): void {
    if (args.passwordStrength < 50) {
      throw new PasswordTooWeakException(args.password)
    }
  }
}
