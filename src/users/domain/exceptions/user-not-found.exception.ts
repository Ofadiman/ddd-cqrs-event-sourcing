import { HttpException, HttpStatus } from '@nestjs/common'

export class UserNotFoundException extends HttpException {
  public constructor(args: Record<string, string>) {
    super(`User identified by parameters: ${JSON.stringify(args)} not found!`, HttpStatus.NOT_FOUND)
  }
}
