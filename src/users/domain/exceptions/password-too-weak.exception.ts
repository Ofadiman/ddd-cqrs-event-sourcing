import { HttpException, HttpStatus } from '@nestjs/common'

export class PasswordTooWeakException extends HttpException {
  public constructor(password: string) {
    super(`Password ${password} is too weak!`, HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
