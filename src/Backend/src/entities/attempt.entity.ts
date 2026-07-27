import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Activity } from './activity.entity';

export enum AttemptStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  DECLINED = 'declined',
}

@Entity()
export class Attempt {
  @ManyToOne(() => User, (user) => user.attempts)
  user: User;

  @ManyToOne(() => Activity, (activity) => activity.attempts)
  activity: Activity;

  @Column()
  is_photo: boolean;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: AttemptStatus })
  status: AttemptStatus;

  @Column()
  reward: number;
}
