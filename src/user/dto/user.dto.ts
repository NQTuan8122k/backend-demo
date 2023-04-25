import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { Dayjs } from 'dayjs';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'Full name cannot plank' })
  fullName: string;

  @IsNotEmpty({ message: 'Date of birth cannot plank' })
  dateOfBirth: Dayjs;

  @Max(255, { message: 'Password must be less than 255 character' })
  @Min(8, { message: 'Password must more than 8 character' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @Max(150, { message: 'Username must be less than 150 character' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;

  @Length(10, 10, { message: 'Phone number must be 10 character' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot plank' })
  email: string;

  @Max(255, { message: 'address must be less than 255 character' })
  @IsNotEmpty({ message: 'address cannot plank' })
  address: string;

  createAt: Dayjs;
}

export class UserLoginDto {
  @Max(255, { message: 'Password must be less than 255 character' })
  @Min(8, { message: 'Password must more than 8 character' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @Max(150, { message: 'Username must be less than 150 character' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;
}
