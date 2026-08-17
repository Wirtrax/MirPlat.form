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
    async sendAndCheckAnswer(quizId: number, userid: number, user_answer: string[]): Promise<Result> {
        const questions = await this.quizQuestionRepo.find({
            where: {quiz: {id: quizId}},
            select: {answer_text: true},
            order: {id: 'ASC'}
        });

        const reward = await this.quizRepo.findOneBy({id: quizId});

        if(!reward) {
            throw new NotFoundException('Данные о награде не найдены');
        }

        const questionsCount = await this.quizQuestionRepo.count({where: {quiz: {id: quizId}}});

        let correctAnswersCount = 0;

        const normalize = (s: string) => s.trim().toLowerCase();

        questions.forEach((question, index) => { 
            if(normalize(question.answer_text) === normalize(user_answer[index]))
                correctAnswersCount++
        });

        if(correctAnswersCount === questionsCount) {

            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, quizId, reward.reward, userid);
                await manager.increment(User, {id: userid}, 'balance', reward.reward);
            })

        return { text_result: QuizResultnEnum.ACCEPT, reward: reward.reward };
        }
        else {
            return{ text_result: QuizResultnEnum.REJECT, reward: 0}
        }
    }

    
}
