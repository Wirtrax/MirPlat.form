import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tetris } from 'src/entities/tetris.entity';
import { Activity  } from 'src/entities/activity.entity';
import { Attempt, AttemptStatus } from 'src/entities/attempt.entity';

@Injectable()
export class TetrisService {
    constructor (
        @InjectRepository(Tetris)
        private tetrisRepository: Repository<Tetris>,
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
        @InjectRepository(Attempt)
        private attemptRepository: Repository<Attempt>,
    ) {}

    async findTetrisRefByName(name: string = "tetris"): Promise<Tetris> {
        const tetris = await this.tetrisRepository.findOneBy({ 
            name: name,
        });

        if(!tetris) {
            throw new NotFoundException('Tetris reference not found');
        }
        
        return tetris      
    }

    async getLinkOfTetrisReference(): Promise<string> {
        const tetris = await this.findTetrisRefByName();
        const link = tetris.photo_example_link;

        if(!link) {
            throw new NotFoundException('Reference link not found')
        }

        return tetris.photo_example_link;
    }

    async createTetrisAttempt(
        user_id: number,
        photo_link: string,
    ): Promise<void> {
        const tetris = await this.findTetrisRefByName()
        const activity = await this.activityRepository.findOneBy({ name: 'tetris' });

        if (!activity) {
            throw new Error('Activity "tetris" not found');
        }

        const attempt = this.attemptRepository.create({
            user: { id: user_id },
            activity: { id: activity.id },
            is_photo: true,
            photo: photo_link,
            status: AttemptStatus.WAITING,
            reward: tetris.reward,
            created_at: new Date(),
        });
    }
}