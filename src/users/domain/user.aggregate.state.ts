import { AggregateState } from './user.aggregate'

export type UserAggregateState = AggregateState & {
  name: string
  email: string
  passwordHash: string
}
