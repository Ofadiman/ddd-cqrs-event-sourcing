import { Module } from '@nestjs/common'
import { UsersController } from './presentation/users.controller'
import { CreateUserCommandHandler } from './application/create-user/create-user.command.handler'
import { UserPasswordService } from './infrastructure/user.password.service'
import { UserAggregateRepository } from './infrastructure/user.aggregate.repository'
import { UserAggregateAdapter } from './domain/user.aggregate.adapter'

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [
    CreateUserCommandHandler,
    UserPasswordService,
    UserAggregateRepository,
    UserAggregateAdapter,
  ],
})
export class UsersModule {}
