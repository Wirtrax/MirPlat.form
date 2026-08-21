import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/activities/quiz/quiz.entity';
import { Attempt } from 'src/entities/attempt.entity';
import { QuizQuestion } from 'src/entities/activities/quiz/quiz-question.enity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Quiz,
    Attempt,
    QuizQuestion])],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
