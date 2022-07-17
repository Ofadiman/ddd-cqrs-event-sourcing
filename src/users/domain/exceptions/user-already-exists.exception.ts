import { HttpException, HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsException extends HttpException {
  public constructor(args: Record<string, string | number>) {
    super(
      `User identified by parameters: ${JSON.stringify(args)} already exists!`,
      HttpStatus.CONFLICT,
    )
  }
}
