import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Attempt } from './attempt.entity';

export enum UserProgrammingLevel {
  SENIOR = 'senior',
  MIDDLE = 'middle',
  JUNIOR = 'junior',
  TEAM_LEAD = 'team_lead',
  CTO = 'cto',
  OTHER = 'other',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  telegram_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  patronym: string;

  @Column()
  specialization: string; // TODO: change to enum

  @Column({ type: 'enum', enum: UserProgrammingLevel })
  programming_level: UserProgrammingLevel;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  profile_picture: string;

  @Column()
  send_notifications: boolean;

  @Column()
  balance: number;

  @Column()
  is_admin: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts: Attempt[];
}
