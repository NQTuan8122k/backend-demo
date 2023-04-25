import { Dayjs } from 'dayjs';
import { Task } from 'src/task/task.entity/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullName: string;

  @Column()
  dateOfBirth: Dayjs;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ default: 'Active' })
  status: string;

  @Column()
  createAt: Dayjs;

  @Column()
  lastModify: Dayjs | null;
}
