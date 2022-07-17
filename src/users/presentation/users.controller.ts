import { Body, Controller, Post } from '@nestjs/common'
import { RegisterUserCommand } from '../application/register-user/register-user.command'
import { RegisterUserRequestBodyDto, RegisterUserResponseBodyDto } from './dto/register-user.dto'
import { CommandBus } from '../../core/cqrs/commands/command-bus'

@Controller('users')
export class UsersController {
  public constructor(private readonly commandBus: CommandBus) {}

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
}
