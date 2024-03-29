import {Body, Controller, Post, UseGuards, Request, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/user-registration.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}


  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test() {
    return "Test endpoint";
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.generateTokenAfterCorrectLogin(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: RegistrationDto) {
    return await this.userService.createUser(createUserDto);
  }
}
