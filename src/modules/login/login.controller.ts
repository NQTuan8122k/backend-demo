import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserLoginRequestDto } from 'src/dtos/request/login.req.dto';
import { DEFAULT_RESPONSE } from 'src/constants';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  findOne(@Response() response, @Body() loginData: UserLoginRequestDto) {
    this.loginService.findOne({ username: loginData.username })?.then((res) => {
      if (
        !!res?.username &&
        res?.password == loginData.password &&
        !!res?.password !== false
      ) {
        const responseFull = {
          ...DEFAULT_RESPONSE,
          ...{
            response_code: 200,
            response_description: 'Login success',
            response_message: 'Login success',
            data: res,
          },
        };
        response.status(HttpStatus.OK).json(responseFull);
      } else {
        response.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          description: 'Wrong username or password',
          error_message: 'Wrong username or password',
        });
      }
    });
  }
}
