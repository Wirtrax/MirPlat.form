import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/activities/quiz/quiz.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { createAttempt } from '../helpers/attempt.helper';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepo: Repository<Quiz>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    /*async getQuestionText(quizId: number): Promise<QuizQuestion[]> {
        return await this.quizQuestionRepo.find({
            where: { quiz: { id: quizId }},
            select: {id: true, question_text: true},
            order: {id: 'ASC'}
        });
    }*/
    async sendReward(userid: number): Promise<{ reward: number }> {

    const quiz = await this.quizRepo.find().then(q => q[0])

    if (!quiz) {
        throw new NotFoundException('Квиз не найден');
    }

    await this.dataSource.transaction(async manager => {
        await createAttempt(manager, userid, quiz.reward, quiz.name);
        await manager.increment(User, { id: userid }, 'balance', quiz.reward);
    });

    return { reward: quiz.reward };
    }
    
    
}
