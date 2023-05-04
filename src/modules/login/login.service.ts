import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType } from 'src/constants/role-file';
import { TokenType } from 'src/constants/token-type';
import { UserEntity } from 'src/entities/user/user.entity';
import { TokenPayloadDto } from 'src/types/dtos/token.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly taskRepo: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async findOne(data: object): Promise<UserEntity> {
    return await this.taskRepo.findOne({ where: { ...data } });
  }

  async createAccessToken(data: {
    role: string;
    userId: string;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync({
        expiresIn: 3600,
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
}
