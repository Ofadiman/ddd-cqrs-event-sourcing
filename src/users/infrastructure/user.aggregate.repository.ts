import { Injectable } from '@nestjs/common'
import { UserAggregate } from '../domain/user.aggregate'
import { Model } from 'objection'
import { UserSnapshotModel } from '../../database/models/user.snapshot.model'
import { UserEventModel } from '../../database/models/user.event.model'
import { UserAggregateAdapter } from '../domain/user.aggregate.adapter'

export type AggregateRepository<Aggregate> = {
  save(aggregate: Aggregate): Promise<string>
  getById(id: string): Promise<Aggregate>
}

@Injectable()
export class UserAggregateRepository implements AggregateRepository<UserAggregate> {
  public constructor(private readonly userAggregateAdapter: UserAggregateAdapter) {}

  public async save(aggregate: UserAggregate): Promise<string> {
    const snapshot = this.userAggregateAdapter.fromAggregateToSnapshot(aggregate)

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

  public async getById(snapshotId: string): Promise<UserAggregate> {
    const snapshot = await UserSnapshotModel.query().findById(snapshotId)

    if (snapshot === undefined) {
      throw new Error('Aggregate not found!')
    }

    return this.userAggregateAdapter.fromSnapshotToAggregate(snapshot)
  }
}
