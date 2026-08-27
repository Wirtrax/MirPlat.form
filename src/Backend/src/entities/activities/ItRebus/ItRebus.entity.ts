import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItRebus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'ItRebus'})
    name: string;

    @Column()
    reward_per_answer: number;
}


