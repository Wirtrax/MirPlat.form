import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'quiz' })
    name: string;

    @Column()
    reward_per_answer: number;
}