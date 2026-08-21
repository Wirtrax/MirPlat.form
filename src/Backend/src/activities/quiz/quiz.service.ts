import {ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/activities/quiz/quiz.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { createAttempt } from '../helpers/attempt.helper';
import { Attempt } from 'src/entities/attempt.entity';
import { QuizQuestion } from 'src/entities/activities/quiz/quiz-question.enity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepo: Repository<Quiz>,

        @InjectDataSource()
        private readonly dataSource: DataSource,

        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>, 

        @InjectRepository(QuizQuestion)
        private readonly quizQuestionRepo: Repository<QuizQuestion>
    ) {}

    async getQuestionText(quizId: number): Promise<QuizQuestion[]> {
        return await this.quizQuestionRepo.find({
            where: { quiz: { id: quizId }},
            select: {id: true, question_text: true},
            order: {id: 'ASC'}
        });
    }
    async checkAnswersAndSendReward(userId: number, answers: {questionId: number, answer: string}[]): Promise<{ reward: number }> {

    const quiz = await this.quizRepo.find().then(q => q[0])

    if (!quiz) {
        throw new NotFoundException('Квиз не найден');
    }

    const already = await this.attemptRepo.existsBy({
        user: { id: userId },
        activity: { name: quiz.name },
    });
    if (already) throw new ForbiddenException('Активность уже пройдена');

    const questions = await this.quizQuestionRepo.find({
        where: { quiz: { id: quiz.id } },
        order: { id: 'ASC' },
    });

    let correctCount = 0;

    questions.forEach((question) => {
        const userAnswer = answers.find(a => a.questionId === question.id)
        if (userAnswer && this.checkAnswer(question, userAnswer.answer)) {
            correctCount++;
        }
    });

    const success = correctCount === questions.length;

    const reward = success? quiz.reward : 0;

    await this.dataSource.transaction(async manager => {
        await createAttempt(manager, userId, reward, quiz.name);

        if (reward>0)
            await manager.increment(User, { id: userId }, 'balance', reward);
    });

    return { reward: reward };
    }

    checkAnswer(question: QuizQuestion, userAnswer: string): boolean {
        const normalize = (s: string) => s.trim().toLowerCase();
        const correctVariants = question.answer_text.split(';').map(normalize);
        return correctVariants.includes(normalize(userAnswer));
    }
    
    async checkOnReply(userId: number): Promise<{ result: boolean }> {
        const quiz = await this.quizRepo.find().then(q => q[0])
        if (!quiz) {
            throw new NotFoundException('Квиз не найден');
        }

        const exist = await this.attemptRepo.existsBy({
            user: { id: userId },
            activity: { name: quiz.name}
        })

        return {result: exist}
    }
}
