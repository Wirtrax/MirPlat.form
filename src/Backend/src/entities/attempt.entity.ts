import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Activity } from './activity.entity';

export enum AttemptStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  DECLINED = 'declined',
}

export enum DeclineReason {
  WRONG_PHOTO = 'wrong_photo',
  INCORRECT_SOLUTION = 'incorrect_solution',
}

@Entity()
export class Attempt {
  @PrimaryGeneratedColumn()
  id: number;
  
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

  @Column({ type: 'enum', enum: DeclineReason, nullable: true})
  reason: DeclineReason;

  @Column()
  reward: number;

  @Column()
  created_at: Date;
}
