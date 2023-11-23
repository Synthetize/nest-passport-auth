import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import config from '../constants';
import {JwtModule, JwtService} from "@nestjs/jwt";
import { UsersService } from "../users/users.service";


@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class AuthModule {}
