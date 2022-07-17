import { Model } from 'objection'

export type UserSnapshot = {
  id: string
  version: number

  created_at: string
  updated_at: string
  deleted_at: string | null

  name: string
  email: string
  password_hash: string
}

export class UserSnapshotModel extends Model implements UserSnapshot {
  static override get tableName(): string {
    return 'user_snapshots'
  }

  public id: string
  public version: number

  public created_at: string
  public updated_at: string
  public deleted_at: string | null

  public email: string
  public name: string
  public password_hash: string
}
