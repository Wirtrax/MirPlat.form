import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { QuizModule } from './quiz/quiz.module';
import { TetrisModule } from './tetris/tetris.module';
import { PhotoCheckModule } from './photo-check/photo-check.module';
import { ItRebusModule } from './ITrebus/ItRebus.module';
import { CardGame4x4Module } from './card-game-4x4/card-game-4x4.module';

@Module({
    imports: [
        TetrisModule,
        QuizModule,
        PhotoCheckModule,
        ItRebusModule,
        CardGame4x4Module,
    ],
    controllers: [ActivitiesController],
    providers: [],
})
export class ActivitiesModule {}