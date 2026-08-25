import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tetris } from 'src/entities/activities/tetris.entity';
import { Activity  } from 'src/entities/activity.entity';
import { Attempt, AttemptStatus } from 'src/entities/attempt.entity';
import { checkOnReply } from '../helpers/attempt.helper';
import { isAttemptExist } from '../helpers/attempt.helper';
import { MediaService } from 'src/media/media.service';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class TetrisService {
    constructor (
        @InjectRepository(Tetris)
        private tetrisRepository: Repository<Tetris>,
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
        @InjectRepository(Attempt)
        private attemptRepository: Repository<Attempt>,

        @InjectDataSource()
        private dataSource: DataSource,

        private mediaService: MediaService,
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
            throw new NotFoundException('Activity "tetris" not found');
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

    async savePhotoAndCreateAttempt(
        user_id: number,
        photo: Express.Multer.File,
    ): Promise<void> {
        const tetris = await this.findTetrisRefByName()
        const activity = await this.activityRepository.findOneBy({ name: 'tetris' });

        if (!activity) {
            throw new NotFoundException('Activity "tetris" not found');
        }

        const isAlreadyExist = await isAttemptExist(user_id, activity.name, this.attemptRepository)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        try {
            await this.dataSource.transaction(async manager => {
                let photo_link: string;

                try{
                    photo_link = await this.mediaService.saveFile(photo)
                } catch (error) {
                    throw new InternalServerErrorException('Error during saving file')
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

                await this.attemptRepository.save(attempt);
            })                      
        } catch(error) {
            throw new InternalServerErrorException('Error during creating attempt')
        }
    }

    async checkOnReplyTetris(user_id: number) {
        return checkOnReply(user_id, this.tetrisRepository, this.attemptRepository)
    }
}