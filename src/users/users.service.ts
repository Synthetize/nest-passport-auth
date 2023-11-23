import {
  Injectable, NotFoundException
} from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegistrationDto } from "./dto/user-registration.dto";
import { LoginDto } from "./dto/user-login.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: RegistrationDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  // async login(loginDto: LoginDto) {
  //   const { email, password } = loginDto;
  //   const user = await this.userModel.findOne({ email }).exec();
  //   if (user && user.password === password) {
  //     return user;
  //   }
  //   return null;
  // }
}
