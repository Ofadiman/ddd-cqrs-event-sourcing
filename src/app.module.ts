import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { CqrsModule } from './core/cqrs/cqrs.module'

@Module({
  imports: [UsersModule, DatabaseModule, CqrsModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
