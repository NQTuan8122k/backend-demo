import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly taskRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.taskRepo.find();
  }

  async findOne(data: object): Promise<UserEntity> {
    return await this.taskRepo.findOne({ where: { ...data } });
  }
}
