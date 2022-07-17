import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'

export class ChangeUserPasswordRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  public readonly newPassword: string

  @IsUUID()
  public readonly userId: string
}
