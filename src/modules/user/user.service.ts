import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/response/user.dto';
import { UserEntity } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly taskRepo: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.taskRepo.find();
  }

  findOne(data: object): Promise<UserEntity> {
    return this.taskRepo.findOne({ where: { ...data } });
  }

  create(user: UserRegisterDto) {
    return this.taskRepo.save(user);
  }

  update(user: UserEntity) {
    return this.taskRepo.update(user.userId, user);
  }

  delete(id) {
    return this.taskRepo.delete(id);
  }

  formatDateTime() {
    const date = new Date();

    return date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear();
  }
}
