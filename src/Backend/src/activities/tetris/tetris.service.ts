import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { Activity  } from 'src/entities/activity.entity';
import { Attempt, AttemptStatus } from 'src/entities/attempt.entity';
import { checkOnReply } from '../helpers/attempt.helper';
import { isAttemptExist } from '../helpers/attempt.helper';

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

        const isAlreadyExist = await isAttemptExist(user_id, activity.name, this.attemptRepository)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        try {
            const attempt = this.attemptRepository.create({
                user: { id: user_id },
                activity: { id: activity.id },
                is_photo: true,
                photo: photo_link,
                status: AttemptStatus.WAITING,
                reward: tetris.reward,
                created_at: new Date(),
            });

            await this.attemptRepository.save(attempt);            
        } catch(error) {
            throw new InternalServerErrorException('Error during sending reward')
        }

    }

    async checkOnReplyTetris(user_id: number) {
        return checkOnReply(user_id, this.tetrisRepository, this.attemptRepository)
    }
}