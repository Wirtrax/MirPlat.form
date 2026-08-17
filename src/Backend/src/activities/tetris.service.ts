import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { Activity  } from 'src/entities/activity.entity';
import { Attempt, AttemptStatus } from 'src/entities/attempt.entity';

const PHOTO_LINK_INDEX = 1;
const TETRIS_REWARD = 10;

@Injectable()
export class TetrisService {
    constructor (
        @InjectRepository(Tetris)
        private tetrisRepository: Repository<Tetris>,
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
        @InjectRepository(Attempt)
        private attemptRepository: Repository<Attempt>
    ) {}

    async getLinkOfTetrisReference(): Promise<string> {
        const tetris = await this.tetrisRepository.findOneBy({ 
            id: PHOTO_LINK_INDEX
            //where: {name: "reference"}
        });

        if(!tetris) {
            throw new NotFoundException('Tetris reference not found');
        }

        return tetris.photo_example_link;
    }

    async createTetrisAttempt(
        user_id: number,
        photo_link: string,
    ): Promise<void> {
        const attempt = new Attempt();

        const tetris = await this.activityRepository.findOneBy({ name: 'tetris' });

        if (!tetris) {
            throw new Error('Activity "tetris" not found');
        }

        attempt.user.id = user_id;
        attempt.activity.id = tetris?.id;
        attempt.is_photo = true;
        attempt.photo = photo_link;
        attempt.status = AttemptStatus.WAITING;
        attempt.reward = TETRIS_REWARD;
        attempt.created_at = new Date();

        await this.attemptRepository.save(attempt);
    }
}