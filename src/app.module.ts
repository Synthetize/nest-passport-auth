import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './constants';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(config.DB_URI)],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
