import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttemptsService {
    constructor(
        @InjectRepository(Attempt)
        private readonly attemptsRepo: Repository<Attempt>
    ) {}

async getAllAttempts(): Promise<Attempt[]> {
    return this.attemptsRepo
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
            .getRawMany();
    }   
}
