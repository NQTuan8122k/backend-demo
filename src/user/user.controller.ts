import dayjs from 'dayjs';
import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity/user.entity';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto';
import moment from 'moment';
import { response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() signupData: UserRegisterDto) {
    const createAt = moment.now();
    try {
      this.userService
        .findOne({ username: signupData.username })
        ?.then((res) => {
          if (!!res.username) {
            return response
              .status(HttpStatus.BAD_REQUEST)
              .send('Duplicate username');
          }
        });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Something error');
    }

    this.userService
      .create({
        ...signupData,
        createAt: dayjs(createAt, 'MM-DD-YYYY'),
      })
      .then((res) => {
        return response.status(HttpStatus.CREATED).send({ data: res });
      });

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send('Something error');
  }

  @Post()
  findOne(@Body() loginData: UserLoginDto) {
    const result = this.userService.findOne({
      ...loginData,
    });

    if (
      result.then((res) => {
        if (res.status == 'Active') {
          return response.status(HttpStatus.ACCEPTED).send({ data: res });
        }
      })
    )
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('Wrong username or password');
  }

  @Get()
  getHello(): string {
    return 'hello';
  }
}
