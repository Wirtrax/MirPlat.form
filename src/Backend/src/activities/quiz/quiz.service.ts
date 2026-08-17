import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from 'src/entities/activities/quiz/quiz-question.enity';
import { Quiz } from 'src/entities/activities/quiz/quiz.entity';
import { Attempt } from 'src/entities/attempt.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { createAttempt } from '../helpers/attempt.helper';

type Result = {
    text_result: QuizResultnEnum;
    reward: number;
}

enum QuizResultnEnum {
    ACCEPT = 'Ты ответил верно!',
    REJECT = 'Ответ неверный'
}

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepo: Repository<Quiz>,

        @InjectRepository(QuizQuestion)
        private readonly quizQuestionRepo: Repository<QuizQuestion>,

        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async getQuestionText(quizId: number): Promise<QuizQuestion[]> {
        return await this.quizQuestionRepo.find({
            where: { quiz: { id: quizId }},
            select: {id: true, question_text: true},
            order: {id: 'ASC'}
        });
    }
    async sendAnswer(quizId: number, userid: number): Promise<{ reward: number }> {

    const quiz = await this.quizRepo.findOneBy({ id: quizId });

    if (!quiz) {
        throw new NotFoundException('Квиз не найден');
    }

    await this.dataSource.transaction(async manager => {
        await createAttempt(manager, userid, quizId, quiz.reward);
        await manager.increment(User, { id: userid }, 'balance', quiz.reward);
    });

    return { reward: quiz.reward };
} 
}
