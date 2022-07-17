import { Query } from './query'
import { QueryOutput } from './query-output.type'

export type IQueryHandler<IQuery extends Query<unknown, unknown>> = {
  handle(command: IQuery): Promise<QueryOutput<IQuery>>
}
