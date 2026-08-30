import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FindMistake {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'findMistake'})
    name: string;

    @Column()
    reward_easy: number;

    @Column()
    reward_medium: number;

    @Column()
    reward_hard: number;
}