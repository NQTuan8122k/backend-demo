import dayjs from 'dayjs';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity/user.entity';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto';
import moment from 'moment';
import { response } from 'express';
import { AllExceptionsFilter } from 'src/utils/http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  create(@Response() response, @Body() signupData: UserRegisterDto) {
    this.userService
      .findOne({ username: signupData.username })
      ?.then((res) => {
        if (!!res.username) {
          response.status(HttpStatus.BAD_REQUEST).json({
            status: 400,
            description: 'Duplicate username',
            error_message: 'Duplicate username',
          });
        }
      })
      .catch((error) => {
        const errorData = {
          message: 'Something error',
          errorCode: 502,
          timestamp: new Date().toISOString(),
        };
        console.log('=======0', error);

        throw new HttpException(errorData, HttpStatus.BAD_REQUEST);
      });

    this.userService
      .create({
        ...signupData,
        createAt: new Date().toISOString(),
      })
      .then((res) => {
        response
          .status(HttpStatus.CREATED)
          .json({ status: 201, description: 'Create success', data: res });
      })
      .catch((error) => {
        const errorData = {
          message: 'Something error',
          errorCode: 502,
          timestamp: new Date().toISOString(),
        };
        console.log('=======0', error);

        throw new HttpException(errorData, HttpStatus.BAD_REQUEST);
      });

    // throw new HttpException(errorData, HttpStatus.BAD_GATEWAY);
  }

  @Post('login')
  findOne(@Response() response, @Body() loginData: UserLoginDto) {
    this.userService.findOne({ username: loginData.username })?.then((res) => {
      if (
        !!res?.username &&
        res?.password == loginData.password &&
        !!res?.password !== false
      ) {
        response
          .status(HttpStatus.OK)
          .json({ status: 200, description: 'Login success', data: res });
      } else {
        response.status(405).json({
          status: 405,
          description: 'Wrong username or password',
          error_message: 'Wrong username or password',
        });
      }
    });
  }
}
