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
  // @Get('login')
  // async loginUser(@Body() loginDto: LoginDto) {
  //   return this.usersService.login(loginDto);
  // }

  @Post('register')
  createUser(@Body() createUserDto: RegistrationDto) {
    return this.usersService.createUser(createUserDto);
  }
}
