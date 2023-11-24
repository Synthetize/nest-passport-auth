import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/user-login.dto';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const result = await bcrypt.compare(loginDto.password, user.password);
    if (!result) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }

  async generateTokenAfterCorrectLogin(user: User) {
    const payload = {
      email: user.email,
      sub: {
        userId: user._id,
        name: user.name,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
