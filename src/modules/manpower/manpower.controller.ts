import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginRequestDto } from 'src/dtos/request/login.req.dto';
import { ManpowerService as ManpowerService } from './manpower.service';
import { ManpowerCreationDTO } from 'src/dtos/request/manpower.req.dto';
import { LoginService } from '../login/login.service';

@Controller('manpower')
export class ManpowerController {
  constructor(private readonly manpowerService: ManpowerService) {}

  @Get()
  find(
    @Response() response,
    @Body(new ValidationPipe({ transform: true }))
    manpowerData: ManpowerCreationDTO,
  ) {
    return 'hehehhe';
  }

  @Post('create')
  async create(
    @Response() response,
    @Body(new ValidationPipe({ transform: true }))
    manpowerData: ManpowerCreationDTO,
  ) {
    try {
      const manpower = await this.manpowerService.create({
        ...manpowerData,
      });
      console.log('===========', manpower);

      if (!!manpower.id) {
        response.status(HttpStatus.CREATED).json({
          request_id: 'string',
          status: 201,
          response_code: 'MANPOWER_200',
          response_message: 'Create success',
          response_description: 'Create new manpower request success',
          request_date_time: new Date().toISOString(),
          data: manpower,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 500,
          description: 'Manpower creation internal error',
          error_message: 'Internal server error',
          error_detail: null,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 500,
        description: 'Manpower creation internal error',
        error_message: 'Internal server error',
        error_detail: error,
        timestamp: new Date().toISOString(),
      });
    }
  }

  // @Post('MQRList')
  // async findAll(
  //   @Response() response,
  //   @Body(new ValidationPipe({ transform: true }))
  //   manpowerData: ManpowerCreationDTO,
  // ) {
  //   // const manpower = await this.manpowerService.findAll();
  //   return JSON.stringify(manpowerData) + '  asdadasd';
  // }
}
