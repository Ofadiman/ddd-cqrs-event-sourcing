import { Model } from 'objection'
import { UserAggregateEventEnum } from '../../users/domain/user.aggregate'

export type UserEvent = {
  id: string
  snapshot_id: string
  sequence: number
  name: UserAggregateEventEnum
  created_at: string
  payload: object
}

export class UserEventModel extends Model implements UserEvent {
  static override get tableName(): string {
    return 'user_events'
  }

  public id: string
  public snapshot_id: string
  public sequence: number
  public name: UserAggregateEventEnum
  public created_at: string
  public payload: object
}
