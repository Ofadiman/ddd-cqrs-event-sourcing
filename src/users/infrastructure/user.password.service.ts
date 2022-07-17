import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserPasswordService {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  public async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
