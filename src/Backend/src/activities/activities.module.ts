import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { QuizModule } from './quiz/quiz.module';
import { TetrisModule } from './tetris/tetris.module';
import { PhotoCheckModule } from './photo-check/photo-check.module';
import { ItRebusModule } from './ITrebus/ItRebus.module';

@Module({
    imports: [
        TetrisModule,
        QuizModule,
        PhotoCheckModule,
        ItRebusModule,
    ],
    controllers: [ActivitiesController],
    providers: [],
})
export class ActivitiesModule {}