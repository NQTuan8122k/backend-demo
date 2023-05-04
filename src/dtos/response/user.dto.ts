import {
  IsEmail,
  IsNotEmpty,
  Length,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleType } from 'src/constants/role-file';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'Full name cannot plank' })
  fullname: string;

  @IsNotEmpty({ message: 'Date of birth cannot plank' })
  dateOfBirth: string;

  @MaxLength(150, { message: 'Password must less than 150 characters' })
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @MaxLength(150, { message: 'Username must less than 150 characters' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;

  @Length(10, 10, { message: 'Phone number must be 10 characters' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot plank' })
  email: string;

  @MaxLength(255, { message: 'address must be less than 255 characters' })
  @IsNotEmpty({ message: 'address cannot plank' })
  address: string;

  createAt: string;

  role: RoleType;
}
