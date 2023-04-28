import { IsNotEmpty, Max, Min } from 'class-validator';

export class UserLoginRequestDto {
  @Max(255, { message: 'Password must be less than 255 character' })
  @Min(8, { message: 'Password must more than 8 character' })
  @IsNotEmpty({ message: 'Password cannot plank' })
  password: string;

  @Max(150, { message: 'Username must be less than 150 character' })
  @IsNotEmpty({ message: 'Username cannot plank' })
  username: string;
}
