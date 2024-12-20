import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { RegisterUserCommand } from '../application/register-user/register-user.command'
import { RegisterUserRequestBodyDto, RegisterUserResponseBodyDto } from './dto/register-user.dto'
import { CommandBus } from '../../core/cqrs/command/command-bus'
import { ChangeUserPasswordRequestBodyDto } from './dto/change-user-password.dto'
import { ChangeUserPasswordCommand } from '../application/change-user-password/change-user-password.command'
import { DeleteUserRequestParamDto } from './dto/delete-user.dto'
import { DeleteUserCommand } from '../application/delete-user/delete-user.command'
import { QueryBus } from '../../core/cqrs/query/query-bus'
import { GetUserByIdRequestParamDto, GetUserByIdResponseBodyDto } from './dto/get-user-by-id.dto'
import { GetUserByIdQuery } from '../application/get-user-by-id/get-user-by-id.query'

@Controller('users')
export class UsersController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  public async registerUser(
    @Body() body: RegisterUserRequestBodyDto,
  ): Promise<RegisterUserResponseBodyDto> {
    return this.commandBus.execute(
      new RegisterUserCommand({
        name: body.name,
        email: body.email,
        password: body.password,
      }),
    )
  }

  @Post('change-password')
  public async changeUserPassword(@Body() body: ChangeUserPasswordRequestBodyDto): Promise<void> {
    return this.commandBus.execute(
      new ChangeUserPasswordCommand({ plainPassword: body.newPassword, userId: body.userId }),
    )
  }

  @Delete(':userId')
  public async deleteUser(@Param() param: DeleteUserRequestParamDto): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand({ userId: param.userId }))
  }

  @Get(':userId')
  public async getUserById(
    @Param() param: GetUserByIdRequestParamDto,
  ): Promise<GetUserByIdResponseBodyDto> {
    return this.queryBus.execute(new GetUserByIdQuery({ userId: param.userId }))
  }
}
