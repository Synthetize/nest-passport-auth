import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginDto> {
    const user = await this.usersService.findUserByEmail(email);
    // (const match = await bcrypt.compare(pass, user.password));
    if (user && user.password === password) {
      return {
        email: user.email,
        name: user.name,
        userId: user._id,
      };
    }
    return null;
  }

  async generateTokenAfterCorrectLogin(user: LoginDto) {
    const payload = {
      email: user.email,
      sub: {
        userId: user.userId,
        name: user.name,
      },
    };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
