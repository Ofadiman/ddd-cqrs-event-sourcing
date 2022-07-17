import { Query } from './query'

export type QueryOutput<IQuery extends Query<unknown, unknown>> = IQuery['_output']
