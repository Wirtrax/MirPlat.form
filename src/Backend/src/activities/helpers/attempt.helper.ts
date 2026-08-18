import { EntityManager } from 'typeorm';
import { Attempt, AttemptStatus } from '../../entities/attempt.entity';
import { Activity } from 'src/entities/activity.entity';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

export async function createAttempt(
    manager: EntityManager,
    userId: number,
    reward: number,
    activityName: string
): Promise<Attempt> {
    const activity = await manager.findOneBy(Activity, {name: activityName})
    if(!activity) {
        throw new NotFoundException('Активность "${activityName}" не найдена');
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