import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { UserRegisterDto } from 'src/dtos/response/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async create(@Response() response, @Body() signupData: UserRegisterDto) {
    const user = await this.userService
      .findOne({ username: signupData?.username })
      ?.then((res) => {
        return res;
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 500,
          description: 'Checking user info in database error',
          error_message: 'Internal server error',
          error_detail: error,
          timestamp: new Date().toISOString(),
        });
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
      this.userService
        .create({
          ...signupData,
          createAt: new Date().toISOString(),
        })
        .then((res) => {
          return response.status(HttpStatus.CREATED).json({
            request_id: 'string',
            status: 201,
            response_code: 'AUTH_200',
            response_message: 'Create success',
            response_description: 'Create new user success',
            request_date_time: new Date().toISOString(),
            access_token: 'string',
            refresh_token: 'string',
            data: res,
          });
        })
        .catch((error) => {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 500,
            description: 'Creating new user error',
            error_message: 'Internal server error',
            error_detail: error,
            timestamp: new Date().toISOString(),
          });
        });
    }
  }

  // @Post('login')
  // findOne(@Response() response, @Body() loginData: UserLoginRequestDto) {
  //   this.userService.findOne({ username: loginData.username })?.then((res) => {
  //     if (
  //       !!res?.username &&
  //       res?.password == loginData.password &&
  //       !!res?.password !== false
  //     ) {
  //       response
  //         .status(HttpStatus.OK)
  //         .json({ status: 200, description: 'Login success', data: res });
  //     } else {
  //       response.status(405).json({
  //         status: 405,
  //         description: 'Wrong username or password',
  //         error_message: 'Wrong username or password',
  //       });
  //     }
  //   });
  // }
}
