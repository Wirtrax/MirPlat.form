import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { TetrisService } from './tetris.service';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { QuizModule } from './quiz/quiz.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tetris]),
        QuizModule,
    ],
    controllers: [ActivitiesController],
    providers: [TetrisService],
})
export class ActivitiesModule {}