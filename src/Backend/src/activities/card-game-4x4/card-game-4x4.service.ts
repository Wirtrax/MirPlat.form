import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { checkOnReply, createAttempt, isAttemptExist } from "../helpers/attempt.helper";
import { Attempt } from "src/entities/attempt.entity";
import { DataSource } from "typeorm/browser";
import { CardGame4x4 } from "src/entities/activities/4x4/card-game-4x4.entity";
import { CardGroup } from "src/entities/activities/4x4/card-group.entity";

export interface CardGameItem {
    id: number;
    icon: string;
    group_id: string;
}

@Injectable()
export class CardGame4x4Service {
    constructor(
        @InjectRepository(CardGame4x4)
        private readonly cardGame4x4Repo: Repository<CardGame4x4>,

        @InjectRepository(CardGroup)
        private readonly cardGroupRepo: Repository<CardGroup>,
        
        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async getCardGroups():Promise<CardGameItem[]> {
        const allCards = await this.cardGroupRepo.find();

        if(allCards.length === 0) {
            throw new NotFoundException('Card-group is empty')
        }

        return allCards;
    }

    async sendReward(
        user_id: number, 
        count_of_guesed_group: number
    ): Promise<number> {
        const card_game_4x4 = await this.cardGame4x4Repo.findOne({
            where: {},
            order: { id: 'ASC' }
        });

        if(!card_game_4x4) {
            throw new NotFoundException('Cannot find card_game_4x4');
        }

        const isAlreadyExist = await isAttemptExist(user_id, card_game_4x4.name, this.attemptRepo)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        const reward = card_game_4x4.reward_per_group;

        if(!reward) {
            throw new NotFoundException('Cannot find reward for card_game_4x4')
        }

        try {
            const total_reward =  Math.min(
                reward*count_of_guesed_group,
                card_game_4x4.max_reward
            ); 

            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, user_id, total_reward, card_game_4x4.name);
                await manager.increment(User, { id: user_id }, 'balance', total_reward);
            });

            return total_reward;
        } catch {
            throw new InternalServerErrorException('Unpredictable error during sendin reward')
        }
    }


    async checkOnReplyCardGame(
    userId: number,
    ): Promise<{ 
        result: boolean,
        reward: number
    }> {
        const activity = await this.cardGame4x4Repo.find().then(c => c[0])
        if (!activity) {
            throw new NotFoundException(`Активность не найдена`);
        }

        const attempt = await this.attemptRepo.findOneBy({
            user: { id: userId },
            activity: { name: activity.name}
        })

        if (!attempt) {
            return {
                result: false,
                reward: 0
            }
        }

        return {
            result: true,
            reward: attempt.reward,
        }
    }
} 