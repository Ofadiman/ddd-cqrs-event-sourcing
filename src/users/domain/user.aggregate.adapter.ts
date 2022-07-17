import { Injectable } from '@nestjs/common'
import { UserAggregate } from './user.aggregate'
import { UserSnapshot } from '../../database/models/user.snapshot.model'

export type AggregateAdapter<Aggregate, Snapshot> = {
  fromAggregateToSnapshot: (aggregate: Aggregate) => Snapshot
  fromSnapshotToAggregate: (snapshot: Snapshot) => Aggregate
}

@Injectable()
export class UserAggregateAdapter implements AggregateAdapter<UserAggregate, UserSnapshot> {
  public fromAggregateToSnapshot(aggregate: UserAggregate): UserSnapshot {
    const state = aggregate.getState()

    return {
      id: state.id,
      version: state.version,

      created_at: state.createdAt,
      updated_at: state.updatedAt,
      deleted_at: state.deletedAt,

      name: state.name,
      email: state.email,
      password_hash: state.passwordHash,
    }
  }

  public fromSnapshotToAggregate(snapshot: UserSnapshot): UserAggregate {
    const aggregate = new UserAggregate()

    aggregate.restore(snapshot)

    return aggregate
  }
}
