import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../users/dto/user-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
