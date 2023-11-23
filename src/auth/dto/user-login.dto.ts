import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly userId: ObjectId;

  @IsNotEmpty()
  readonly name: string;
}
