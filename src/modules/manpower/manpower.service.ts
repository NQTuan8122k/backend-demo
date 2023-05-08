import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManpowerCreationDTO } from 'src/dtos/request/manpower.req.dto';
import { ManpowerEntity } from 'src/entities/Manpower/manpower.entity';
import { Repository } from 'typeorm';
import { LoginService } from '../login/login.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ManpowerService {
  constructor(
    @InjectRepository(ManpowerEntity)
    private readonly taskRepo: Repository<ManpowerEntity>,
  ) {}

  async findOne(data: object): Promise<ManpowerEntity> {
    return await this.taskRepo.findOne({ where: { ...data } });
  }

  async findAll(): Promise<ManpowerEntity[]> {
    return await this.taskRepo.find();
  }

  create(manpower: ManpowerCreationDTO) {
    return this.taskRepo.save({
      approvers: manpower?.approver,
      document_url: manpower?.document_url || null,
      expired_date: manpower?.expired_date,
      level: manpower?.level_id,
      position: manpower?.position_id,
      quantity: manpower?.quantity,
      status: 0,
      mrq_code: '1111',
    });
  }

  async update(manpower: ManpowerEntity) {
    return await this.taskRepo.update(manpower.id, manpower);
  }

  async delete(id) {
    return await this.taskRepo.delete(id);
  }
}
