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
    ) {
    }

    async createUser(createUserDto: RegistrationDto): Promise<User> {
        const plainTextPassword = createUserDto.password;
        bcrypt.genSalt(bcryptConfig.saltRounds, (err, salt) => {
            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                const {password, ...rest} = createUserDto;
                return this.userModel.create({
                    ...rest,
                    password: hash,
                    salt: salt,
                });
            });
        });
        return null;
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email: email}).exec();
    }

    async getAllUsers() {
        return await this.userModel.find().exec();
    }
}
