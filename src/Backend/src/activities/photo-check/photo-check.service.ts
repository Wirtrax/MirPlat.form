import {ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PhotoCheck } from 'src/entities/activities/photo-check.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { createAttempt, checkOnReply, isAttemptExist } from '../helpers/attempt.helper';
import { Activity } from 'src/entities/activity.entity';
import { Attempt } from 'src/entities/attempt.entity';

@Injectable()
export class PhotoCheckService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Activity)
        private readonly activityRepo: Repository<Activity>,

        @InjectRepository(PhotoCheck)
        private photoCheckRepo: Repository<PhotoCheck>,

        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async claimRewardPhotoCheck(user_id: number): Promise<void> {
        const user = await this.userRepo.findOneBy({ id: user_id });
        if(!user) {
            throw new NotFoundException('User not found')
        }

        const photo_check =  await this.photoCheckRepo.findOneBy({ name: "photoCheck" });
        if(!photo_check) {
            throw new NotFoundException('Photo check activity table does not exist')
        }

        const isAlreadyExist = await isAttemptExist(user_id, photo_check.name, this.attemptRepo)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        try {
            const reward = photo_check.reward;
            if(!reward) {
                throw new NotFoundException('Reward is not found')
            }

            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, user_id, reward, photo_check.name);
                await manager.increment(User, {id: user_id}, 'balance', reward);
            })            
        } catch(error) {
            throw new InternalServerErrorException('Error during sending reward')
        }
    }

    async checkOnReplyPhotoCheck(user_id: number) {
        return checkOnReply(user_id, this.photoCheckRepo, this.attemptRepo)
    }
}