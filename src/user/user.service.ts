import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly taskRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.taskRepo.findOne({ where: { id } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.taskRepo.save(user);
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.taskRepo.update(user.id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}
