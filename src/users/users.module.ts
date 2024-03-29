import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
