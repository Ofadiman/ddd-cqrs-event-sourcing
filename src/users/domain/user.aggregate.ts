import { v4 } from 'uuid'
import { UserSnapshot } from '../../database/models/user.snapshot.model'
import { Projection, UserProjection } from './user.projection'
import { UserAggregateState } from './user.aggregate.state'

export enum UserAggregateEventEnum {
  Created = 'created',
  PasswordChanged = 'password_changed',
  Deleted = 'deleted',
}

export abstract class DomainEvent<Name, Payload> {
  public readonly id: string
  public readonly createdAt: string
  public readonly name: Name
  public readonly payload: Payload

  public snapshotId: string
  public sequence: number

  protected constructor(name: Name, payload: Payload) {
    this.name = name
    this.payload = payload
    this.createdAt = new Date().toISOString()
    this.id = v4()
  }
}

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

export class UserDeletedEvent extends DomainEvent<UserAggregateEventEnum.Deleted, {}> {
  public constructor() {
    super(UserAggregateEventEnum.Deleted, {})
  }
}

export type AggregateState = {
  id: string
  version: number

  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export abstract class Aggregate<State extends AggregateState, Event extends DomainEvent<any, any>> {
  protected abstract projection: Projection<State, Event>

  protected state: State | null = null
  protected events: Event[] = []

  public getUncommittedEvents(): Event[] {
    return this.events
  }

  public clearEvents() {
    this.events = []
  }

  public getState(): Readonly<State> {
    if (this.state === null) {
      throw new Error('State in aggregate is null.')
    }

    return this.state
  }

  protected emit(event: Event): void {
    this.state = this.projection.project(event, this.state)

    event.sequence = this.state.version
    event.snapshotId = this.state.id

    this.events.push(event)
  }
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
