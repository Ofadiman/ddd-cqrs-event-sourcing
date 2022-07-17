// type StaticEventDataFields = {
//   readonly id: string
//   readonly aggregateId: string
//   readonly sequence: number
//   readonly createdAt: string
// }
//
// export type EventData<
//   Name extends string,
//   Data extends Record<string, unknown>,
// > = StaticEventDataFields & {
//   readonly name: Name
//   readonly data: Readonly<Data>
// }

// export type UserCreatedEventData = EventData<
//   UserEventName.UserCreated,
//   {
//     name: string
//     email: string
//     password: string
//   }
// >

export type UserCreatedEventData = {
  readonly id: string
  readonly aggregateId: string
  readonly sequence: 1
  readonly createdAt: string
  readonly data: {
    readonly name: string
    readonly email: string
    readonly passwordHash: string
    readonly createdAt: string
    readonly updatedAt: null
  }
}

export class DomainEvent<Payload> {
  public readonly id!: string
  public readonly aggregateId!: string
  public readonly sequence!: number
  public readonly createdAt!: string
  public readonly name!: string

  public constructor(public readonly payload: Payload) {}
}

export type UserCreatedEventPayload = {
  readonly name: string
  readonly email: string
  readonly passwordHash: string
  readonly createdAt: string
  readonly updatedAt: null
}

export class UserCreatedEvent extends DomainEvent<UserCreatedEventPayload> {}
