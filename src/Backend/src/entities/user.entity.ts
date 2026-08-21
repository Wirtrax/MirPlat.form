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

  @Column({unique:true})
  telegram_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({nullable: true})
  patronym: string;

  @Column()
  specialization: string; // TODO: change to enum

  @Column({ type: 'enum', enum: UserProgrammingLevel })
  programming_level: UserProgrammingLevel;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({default:"WIP"}) // TODO: talk with front about pp
  profile_picture: string;

  @Column()
  send_notifications: boolean;

  @Column({default:0})
  balance: number;

  @Column({default:false})
  is_admin: boolean;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @OneToMany(() => Attempt, (attempt) => attempt.user)
  attempts: Attempt[];

  @Column()
  last_login: Date;
}
