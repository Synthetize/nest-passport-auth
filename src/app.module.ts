import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { dbConfig } from "./constants";
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(dbConfig.uri)],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
