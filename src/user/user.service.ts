import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { UserRegisterDto } from './dto/user.dto';

@Injectable()
export class UserService {
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

  async create(user: UserRegisterDto): Promise<UserEntity> {
    return await this.taskRepo.save(user);
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.taskRepo.update(user.userId, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }

  formatDateTime() {
    const date = new Date();

    return date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear();
  }
}
