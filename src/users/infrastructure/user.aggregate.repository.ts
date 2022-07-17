import { Injectable } from '@nestjs/common'
import { UserAggregate } from '../domain/user.aggregate'
import { Model } from 'objection'
import { UserSnapshotModel } from '../../database/models/user.snapshot.model'
import { UserEventModel } from '../../database/models/user.event.model'

export type AggregateRepository<Aggregate> = {
  save(aggregate: Aggregate): Promise<string>
  getById(id: string): Promise<Aggregate | undefined>
}

@Injectable()
export class UserAggregateRepository implements AggregateRepository<UserAggregate> {
  public async save(aggregate: UserAggregate): Promise<string> {
    const snapshot = aggregate.toSnapshot()

    await Model.transaction(async (trx) => {
      await UserSnapshotModel.query(trx).insert(snapshot).onConflict('id').merge()
      await UserEventModel.query(trx).insert(
        aggregate.getUncommittedEvents().map((event) => {
          return {
            id: event.id,
            snapshot_id: event.snapshotId,
            sequence: event.sequence,
            name: event.name,
            created_at: event.createdAt,
            payload: event.payload,
          }
        }),
      )
    })

    aggregate.clearEvents()

    return snapshot.id
  }

  public async getById(snapshotId: string): Promise<UserAggregate | undefined> {
    const snapshot = await UserSnapshotModel.query().findOne({ id: snapshotId, deleted_at: null })

    if (snapshot === undefined) {
      return undefined
    }

    const userAggregate = new UserAggregate()
    userAggregate.restore(snapshot)

    return userAggregate
  }

  public async getByEmail(email: string): Promise<UserAggregate | undefined> {
    const snapshot = await UserSnapshotModel.query().findOne({ email, deleted_at: null })

    if (snapshot === undefined) {
      return undefined
    }

    const userAggregate = new UserAggregate()
    userAggregate.restore(snapshot)

    return userAggregate
  }

  public async isEmailAvailable(email: string): Promise<boolean> {
    const snapshot = await UserSnapshotModel.query().findOne({ email })

    if (snapshot === undefined) {
      return true
    }

    return false
  }
}
