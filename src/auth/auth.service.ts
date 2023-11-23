import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from "../users/schemas/user.schema";
import { LoginDto } from "../users/dto/user-login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<LoginDto> {
    const user = await this.usersService.findUserByEmail(username);
    // (const match = await bcrypt.compare(pass, user.password));
    if (user && user.password === password) {
      const loginDto: LoginDto = {
        email: user.email,
        name: user.name,
        userId: user._id,
      };
      return loginDto;
    }
    return null;
  }

  async generateTokenAfterCorrectLogin(user: LoginDto) {
    const payload = {
      username: user.email,
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
