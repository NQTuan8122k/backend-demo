import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { UserRegisterDto } from 'src/dtos/response/user.dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    try {
      const user = await this.signupService.findOne({
        username: signupData?.username,
      });

      if (!!user?.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Duplicate username',
          error_message: 'Duplicate username',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else {
        const signupUser = await this.signupService.create({
          ...signupData,
          createAt: new Date().toISOString(),
        });

        if (!!signupUser.username) {
          response.status(HttpStatus.CREATED).json({
            request_id: 'string',
            status: 201,
            response_code: 'SIGNUP_200',
            response_message: 'Create success',
            response_description: 'Create new user success',
            request_date_time: new Date().toISOString(),
            access_token: 'string',
            refresh_token: 'string',
            data: signupUser,
          });
        } else {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 500,
            description: 'Signup internal error',
            error_message: 'Internal server error',
            error_detail: null,
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Signup internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
