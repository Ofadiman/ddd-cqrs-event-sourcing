import { Module } from '@nestjs/common'
import { UsersController } from './presentation/users.controller'
import { RegisterUserCommandHandler } from './application/register-user/register-user.command.handler'
import { UserPasswordService } from './infrastructure/user.password.service'
import { UserAggregateRepository } from './infrastructure/user.aggregate.repository'
import { ChangeUserPasswordCommandHandler } from './application/change-user-password/change-user-password.command.handler'
import { DeleteUserCommandHandler } from './application/delete-user/delete-user.command.handler'

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [
    RegisterUserCommandHandler,
    UserPasswordService,
    UserAggregateRepository,
    ChangeUserPasswordCommandHandler,
    DeleteUserCommandHandler,
  ],
})
export class UsersModule {}
