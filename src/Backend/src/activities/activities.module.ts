import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { QuizModule } from './quiz/quiz.module';
import { TetrisModule } from './tetris/tetris.module';
import { PhotoCheckModule } from './photo-check/photo-check.module';

@Module({
    imports: [
        TetrisModule,
        QuizModule,
        PhotoCheckModule,
    ],
    controllers: [ActivitiesController],
    providers: [],
})
export class ActivitiesModule {}