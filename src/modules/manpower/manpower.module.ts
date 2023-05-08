import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManpowerEntity } from 'src/entities/Manpower/manpower.entity';
import { ManpowerController } from './manpower.controller';
import { ManpowerService } from './manpower.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ManpowerEntity])],
  providers: [ManpowerService],
  controllers: [ManpowerController],
})
export class ManpowerModule {}
