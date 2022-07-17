import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import knex, { Knex } from 'knex'
import knexConfig from '../../knexfile'
import { Model } from 'objection'

@Module({})
@Global()
export class DatabaseModule implements OnModuleDestroy, OnModuleInit {
  public readonly knex: Knex

  public constructor() {
    this.knex = knex(knexConfig)
  }

  public async onModuleDestroy(): Promise<void> {
    await this.knex.destroy()
  }

  public async onModuleInit(): Promise<void> {
    Model.knex(this.knex)
  }
}
