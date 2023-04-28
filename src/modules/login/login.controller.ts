import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserLoginRequestDto } from 'src/dtos/request/login.req.dto';
import { DEFAULT_RESPONSE } from 'src/constants';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async findOne(@Response() response, @Body() loginData: UserLoginRequestDto) {
    try {
      const userInfo = await this.loginService.findOne({
        username: loginData.username,
      });
      if (
        !!userInfo?.username &&
        userInfo?.username == loginData.username &&
        userInfo?.password == loginData.password &&
        !!userInfo?.password
      ) {
        return response.status(HttpStatus.OK).json({
          request_id: 'string',
          status: 200,
          response_code: 'LOGIN_200',
          response_message: 'Login success',
          response_description: 'Login success',
          request_date_time: new Date().toISOString(),
          access_token: 'string',
          refresh_token: 'string',
          data: userInfo,
        });
      } else if (!!userInfo?.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Username is not exist',
          error_message: 'Username is not exist',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.username != loginData.username) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong username',
          error_message: 'Wrong username',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else if (userInfo?.password != loginData.password) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong password',
          error_message: 'Wrong password',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 500,
          description: 'Internal server error not handle',
          error_message: 'Internal server error not handle',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Login internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
