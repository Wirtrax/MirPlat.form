import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Attempt } from "./attempt.entity";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @OneToMany(() => Attempt, (attempt) => attempt.activity)
  attempts: Attempt[];
}
