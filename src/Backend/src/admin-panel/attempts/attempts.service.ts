import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Attempt, AttemptStatus } from 'src/entities/attempt.entity';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';


export interface OutputAllAttempts {
    attemptId: number;
    userFullName: string;
    activityName: string;
    attemptStatus: AttemptStatus;
    reward: number;
}

export interface OutputAttempt {
    attemptId: number;
    userFullName: string;
    userPhoneNumber: string,
    userEmail: string,
    activityName: string;
    attemptStatus: AttemptStatus;
    reward: number;
    link: string;
}

@Injectable()
export class AttemptsService {
    constructor(
        @InjectRepository(Attempt)
        private readonly attemptsRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async getAllAttempts(): Promise<OutputAllAttempts[]> {
        /*return this.attemptsRepo
            .createQueryBuilder('attempt')
            .leftJoin('attempt.user', 'user')
            .select([
                'attempt.id AS id',
                'user.id AS user_id',
                "CONCAT(user.last_name, ' ', user.first_name, ' ', user.patronym) AS full_name",
                'attempt.activity AS activity',
                'attempt.photo AS photo',
                'attempt.status AS status',
                'attempt.reward AS reward',
                ])
                .getRawMany(); */

        const allAttempts = await this.attemptsRepo.find({
            relations: {user: true, activity: true}
        })

        return allAttempts.map(a=>({
            attemptId: a.id,
            userFullName: `${a.user.last_name} ${a.user.first_name} ${a.user.patronym ?? ''}`.trim(),
            activityName: a.activity.name,
            attemptStatus: a.status,
            reward: a.reward
        }))
    }
    
    async getAttempt(attemptId: number): Promise<OutputAttempt> {
        const attempt = await this.attemptsRepo.findOne({
            relations: {user: true, activity: true},
            where: {id: attemptId}
        });
        
        if(!attempt) {
            throw new NotFoundException('Попытка не найдена');
        }

        return {
            attemptId: attempt.id,
            userFullName: `${attempt.user.last_name} ${attempt.user.first_name} ${attempt.user.patronym ?? ''}`.trim(),
            userPhoneNumber: attempt.user.phone_number,
            userEmail: attempt.user.email,
            activityName: attempt.activity.name,
            attemptStatus: attempt.status,
            reward: attempt.reward,
            link: attempt.photo
        }
    }

    async changeStatus(attemptId: number, attemptStatus: AttemptStatus) {
        const attempt = await this.attemptsRepo.findOne({
            where: { id: attemptId },
            relations: { user: true, activity: true },
        });

        if (!attempt) throw new NotFoundException('Попытка не найдена');

        const rewardsThisActivity = attempt.activity.name === 'tetris';
        const wasRewarded = attempt.status === AttemptStatus.ACCEPTED && rewardsThisActivity;
        const willReward = attemptStatus === AttemptStatus.ACCEPTED && rewardsThisActivity;

        await this.dataSource.transaction(async manager => {
            if (wasRewarded && !willReward) {
                await manager.increment(User, { id: attempt.user.id }, 'balance', -attempt.reward);
            } else if (!wasRewarded && willReward) {
                await manager.increment(User, { id: attempt.user.id }, 'balance', attempt.reward);
            }
            await manager.update(Attempt, { id: attemptId }, { status: attemptStatus });
        });
        
        return { success: true };
    }
}
