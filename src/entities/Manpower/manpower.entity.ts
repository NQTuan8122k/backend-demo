import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'manpowerEntity' })
export class ManpowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mrq_code: string;

  @Column()
  position: number;

  @Column()
  level: number;

  @Column()
  approvers: string;

  @Column()
  quantity: number;

  @Column({ default: 0 })
  status: number;

  @Column({ default: new Date().toISOString() })
  created_date: string;

  @Column()
  expired_date: string;

  @Column({ default: '' })
  document_url: string;

  @Column({ default: '' })
  lastModify: string;

  @Column()
  createBy: string;

  @ManyToOne(() => UserEntity, (user) => user.manpowers)
  user: UserEntity;
}
