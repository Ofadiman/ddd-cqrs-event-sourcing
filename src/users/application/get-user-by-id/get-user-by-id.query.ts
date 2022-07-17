import { Query } from '../../../core/cqrs/query/query'
import { UserSnapshot } from '../../../database/models/user.snapshot.model'

export type GetUserByIdQueryInput = {
  userId: string
}

export type GetUserByIdQueryOutput = UserSnapshot

export class GetUserByIdQuery extends Query<GetUserByIdQueryInput, GetUserByIdQueryOutput> {}
