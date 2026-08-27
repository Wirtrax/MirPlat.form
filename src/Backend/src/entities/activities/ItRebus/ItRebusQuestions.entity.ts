import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ItRebusQuestions {
    @PrimaryColumn()
    question_id: number;

    @Column()
    description: string;

    @Column('json')
    right_answers: string[];
}