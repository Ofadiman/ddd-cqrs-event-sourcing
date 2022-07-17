import { IsUUID } from 'class-validator'

export class DeleteUserRequestParamDto {
  @IsUUID()
  public readonly userId: string
}
