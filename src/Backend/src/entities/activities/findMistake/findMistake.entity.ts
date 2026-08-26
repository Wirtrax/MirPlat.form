import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FindMistake {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'findMistake'})
    name: string;

    @Column()
    reward_per_answer: number;
}