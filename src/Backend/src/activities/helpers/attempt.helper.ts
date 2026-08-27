import { EntityManager, Repository } from 'typeorm';
import { Attempt, AttemptStatus } from '../../entities/attempt.entity';
import { Activity } from 'src/entities/activity.entity';
import { Injectable, NotFoundException, ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export async function createAttempt(
    manager: EntityManager,
    userId: number,
    reward: number,
    activityName: string
): Promise<Attempt> {
    const activity = await manager.findOneBy(Activity, {name: activityName})
    if(!activity) {
        throw new NotFoundException(`Активность "${activityName}" не найдена`);
    }
    const attempt = manager.create(Attempt, {
        user: { id: userId },
        activity: { id: activity.id },
        is_photo: false,
        status: AttemptStatus.ACCEPTED,
        reward: reward,
        created_at: new Date(),
    });
    return await manager.save(attempt);
}

export async function checkOnReply(
    userId: number,
    activityRepo: Repository<any>,
    attemptRepo: Repository<Attempt>,
): Promise<{ result: boolean }> {
    const activity = await activityRepo.find().then(a => a[0])
    if (!activity) {
        throw new NotFoundException(`Активность не найдена`);
    }

    const exist = await attemptRepo.existsBy({
        user: { id: userId },
        activity: { name: activity.name}
    })

    return {result: exist}
}

export async function isAttemptExist(
    userId: number,
    activityName: string,
    attemptRepo: Repository<any>
): Promise<boolean> {
    const isAlreadyExist = await attemptRepo.findOneBy({
        user: { id: userId},
        activity: { name: activityName }
    });

    return !!isAlreadyExist
}