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
  fullname: string;

  @Column()
  dateOfBirth: string;

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
  createAt: string;

  @Column({ default: null })
  lastModify: string | null;
}
