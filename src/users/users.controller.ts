import { Body, Controller, Get, Post, } from "@nestjs/common";
import { UsersService } from './users.service';
import { RegistrationDto } from './dto/user-registration.dto';
import { LoginDto } from "./dto/user-login.dto";
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return 'This action returns all auths';
  }
}
