import { IsUUID } from 'class-validator'

export class GetUserByIdRequestParamDto {
  @IsUUID()
  public readonly userId: string
}

export class GetUserByIdResponseBodyDto {
  public readonly id: string
  public readonly version: number

  public readonly created_at: string
  public readonly updated_at: string
  public readonly deleted_at: string | null

  public readonly name: string
  public readonly email: string
  public readonly password_hash: string
}
