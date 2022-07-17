import { ClassConstructor } from 'class-transformer'
import { Query } from './query'
import { QueryOutput } from './query-output.type'
import { QUERY_HANDLER_METADATA_KEY } from './query-metadata-keys'

export const QueryHandler = <Input, Output, IQuery extends Query<Input, Output>>(
  query: ClassConstructor<IQuery>,
): (<
  Target extends ClassConstructor<{
    handle(query: IQuery): Promise<QueryOutput<IQuery>>
  }>,
>(
  target: Target,
) => void) => {
  return (target) => {
    Reflect.defineMetadata(QUERY_HANDLER_METADATA_KEY, query, target.prototype)
  }
}
