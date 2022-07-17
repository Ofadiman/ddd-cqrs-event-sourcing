import { HttpException, HttpStatus } from '@nestjs/common'

export class UserEmailNotAvailableException extends HttpException {
  public constructor(email: string) {
    super(`Email ${email} is not available!`, HttpStatus.CONFLICT)
  }
}
