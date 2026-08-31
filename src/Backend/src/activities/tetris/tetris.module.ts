import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TetrisController } from './tetris.controller';
import { TetrisService } from './tetris.service';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { Activity } from 'src/entities/activity.entity';
import { Attempt } from 'src/entities/attempt.entity';
import { MediaService } from 'src/media/media.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Tetris,
            Attempt, 
        ]),
    ],
    controllers: [TetrisController],
    providers: [
        TetrisService,
        MediaService,
    ],
    exports: [TetrisModule]
})
export class TetrisModule {}