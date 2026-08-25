import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";

@Entity()
export class QuizQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question_text: string;

    @Column()
    answer_text: string;

    @ManyToOne(() => Quiz)
    quiz: Quiz;

    @Column({nullable: true})
    position: number;
}