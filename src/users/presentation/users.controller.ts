import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserCommand } from '../application/create-user/create-user.command'
import { CreateUserRequestBodyDto, CreateUserResponseBodyDto } from './dto/create-user.dto'
import { CommandBus } from '../../core/cqrs/commands'

@Controller('users')
export class UsersController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post()
  public async createUser(
    @Body() body: CreateUserRequestBodyDto,
  ): Promise<CreateUserResponseBodyDto> {
    return this.commandBus.execute(
      new CreateUserCommand({
        name: body.name,
        email: body.email,
        password: body.password,
      }),
    )
  }
}
