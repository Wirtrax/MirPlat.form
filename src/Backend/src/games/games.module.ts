import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { TetrisService } from './tetris.service';
import { Tetris } from 'src/entities/tetris.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Tetris]),
    ],
    controllers: [GamesController],
    providers: [TetrisService],
})
export class GamesModule {}