import { EntityManager } from 'typeorm';
import { Attempt, AttemptStatus } from '../../entities/attempt.entity';

export async function createAttempt(
    manager: EntityManager,
    userId: number,
    activityId: number,
    reward: number,
): Promise<Attempt> {
    const attempt = manager.create(Attempt, {
        user: { id: userId },
        activity: { id: activityId },
        is_photo: false,
        status: AttemptStatus.ACCEPTED,
        reward: reward,
        created_at: new Date(),
    });
    return await manager.save(attempt);
}