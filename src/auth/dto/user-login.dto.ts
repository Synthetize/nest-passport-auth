import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
