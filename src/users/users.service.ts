import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from './schemas/user.schema';
import {RegistrationDto} from './dto/user-registration.dto';
import {bcryptConfig} from '../constants';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async createUser(createUserDto: RegistrationDto): Promise<any> {
        const plainTextPassword = createUserDto.password;
        const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
        const {password, ...result} = createUserDto;
        const user = await this.userModel.create({
            ...result,
            password: hashedPassword,
            salt: salt,
        });
        if (!user) {
            //todo: throw custom exception
            throw new HttpException('User not created', 500);
        }
        return {
            success: true,
            message: 'User created successfully',
            _id: user._id,
            email: user.email,
            name: user.name,
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email: email}).exec();
    }

}
