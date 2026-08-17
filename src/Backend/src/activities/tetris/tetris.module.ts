import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TetrisController } from './tetris.controller';
import { TetrisService } from './tetris.service';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { Activity } from 'src/entities/activity.entity';
import { Attempt } from 'src/entities/attempt.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Tetris,
            Activity,
            Attempt, 
        ]),
    ],
    controllers: [TetrisController],
    providers: [TetrisService],
    exports: [TetrisModule]
})
export class TetrisModule {}