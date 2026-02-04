import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(40)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  name: string;
  @IsString()
  @MaxLength(60)
  @MinLength(2)
  lastname: string;
}
