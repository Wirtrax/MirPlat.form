import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Activity } from '../../entities/activity.entity';
import { Repository } from 'typeorm';
import { UserProgrammingLevel } from '../../entities/user.entity';

export interface IUserLoginStats {
    id: number;
    phone_number: string;
    email: string;
    send_notification: boolean;
    first_name: string;
    last_name: string;
    patronym: string;
    programming_level: UserProgrammingLevel;
    specialization: string;
}

export interface IActivityParticipantsStats {
    activity_name: string;
    participants_count: number;
}


@Injectable()
export class SqlService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Activity)
        private activityRepository: Repository<Activity>,
    ) {}

    /**
     * Обёртка SELECT запроса для таблицы user, 
     * который возвращает пользователей, которые авторизировались в выбранную дату
     * @param date 
     * @returns результат запроса
     */
    async getUsersByTodayLogin(date: Date): Promise<IUserLoginStats[]> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999)

        // const query = `
        //     SELECT 
        //         id,
        //         phone_number,
        //         email,
        //         send_notifications,
        //         first_name,
        //         last_name,
        //         patronym,
        //         programming_level,
        //         specialization
        //     FROM "user"
        //     WHERE last_login BETWEEN $1 AND $2
        // `;

        // const result = await this.dataSource.query(query, [startDate, endDate]);

        // return result;

        const result =  await this.userRepository
            .createQueryBuilder('user')
            .select([
                'user.id as id',
                'user.phone_number as phone_number',
                'user.email as email',
                'user.send_notifications as send_notifications',
                'user.first_name as first_name',
                'user.last_name as last_name',
                'user.patronym as patronym',
                'user.programming_level as programming_level',
                'user.specialization as specialization',
            ])
            .where('user.last_login BETWEEN :startDate AND :endDate', {
                startDate,
                endDate
            })
            .getRawMany<IUserLoginStats>();

        return result;
    }


    /**
     * Обёртка для SELECT запроса, который возвращает имя активности и число участников
     * @param date
     * @returns результаты запроса
     */
    async getActivitiesByDate(date: Date): Promise<IActivityParticipantsStats[]> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999)

        const result = await this.activityRepository
            .createQueryBuilder('activity')
            .leftJoin('activity.attempts', 'attempt', 
                'attempt.created_at BETWEEN :startDate AND :endDate', {
                    startDate, 
                    endDate 
                })
            .select([
                'activity.name as activity_name',
                'COUNT(DISTINCT attempt.user.id) as participants_count'
            ])
            .groupBy('activity.id')
            .addGroupBy('activity.name')
            .getRawMany<IActivityParticipantsStats>();
        
        return result;
    }
}