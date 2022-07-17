import { AggregateState } from '../../core/ddd/aggregate-state.type'

export type UserAggregateState = AggregateState & {
  name: string
  email: string
  passwordHash: string
}
