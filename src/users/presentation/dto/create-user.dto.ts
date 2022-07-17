import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'

export class CreateUserRequestBodyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @IsEmail()
  public readonly email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  public readonly name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  public readonly password: string
}

export class CreateUserResponseBodyDto {
  @IsUUID()
  public readonly id: string
}
