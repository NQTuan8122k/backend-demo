import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from 'src/dtos/response/user.dto';
import { UserEntity } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly taskRepo: Repository<UserEntity>,
  ) {}

  findOne(data: object): Promise<UserEntity> {
    return this.taskRepo.findOne({ where: { ...data } });
  }

  create(user: UserRegisterDto) {
    return this.taskRepo.save(user);
  }
}
