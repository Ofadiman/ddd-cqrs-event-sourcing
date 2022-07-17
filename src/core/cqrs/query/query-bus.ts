import { ModulesContainer } from '@nestjs/core'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'
import { IQueryHandler } from './query-handler.type'
import { Query } from './query'
import { QueryOutput } from './query-output.type'
import { QUERY_HANDLER_METADATA_KEY } from './query-metadata-keys'

@Injectable()
export class QueryBus implements OnApplicationBootstrap {
  private readonly handlers = new Map<string, IQueryHandler<any>>()

  public constructor(private readonly modulesContainer: ModulesContainer) {}

  public async execute<Input, Output, IQuery extends Query<Input, Output>>(
    query: IQuery,
  ): Promise<QueryOutput<IQuery>> {
    const queryName = Object.getPrototypeOf(query).constructor.name
    const handler = this.handlers.get(queryName)
    if (!handler) {
      throw new Error(`The handler for query ${queryName} was not found!`)
    }

    return (await handler.handle(query)) as Promise<QueryOutput<IQuery>>
  }

  public onApplicationBootstrap(): void {
    void [...this.modulesContainer.values()].forEach((module): void => {
      if (!module.instance) {
        return
      }

      if (!module.instance.constructor) {
        return
      }

      module.providers.forEach((instanceWrapper) => {
        if (!instanceWrapper.instance) {
          return
        }

        const queryClassReference = Reflect.getMetadata(
          QUERY_HANDLER_METADATA_KEY,
          instanceWrapper.instance as Object,
        ) as ClassConstructor<unknown>

        if (queryClassReference) {
          this.handlers.set(
            queryClassReference.name,
            instanceWrapper.instance as IQueryHandler<any>,
          )
        }
      })
    })
  }
}
