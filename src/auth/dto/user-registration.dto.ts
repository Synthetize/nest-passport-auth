import {
  IsEmail, IsEnum,
  IsNotEmpty, IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  //@MinLength(8)
  // @Matches(
  //   /^(?=[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
  //   {
  //     message:
  //       'La password deve iniziare con una lettera maiuscola, contenere almeno un numero e un carattere speciale, e avere una lunghezza minima di 8 caratteri',
  //   },
  // )
  password: string;

  //todo: prendere l'enum da userschema
  @IsOptional()
  @IsEnum(['ADMIN', 'USER'])
  readonly role: string;
}
