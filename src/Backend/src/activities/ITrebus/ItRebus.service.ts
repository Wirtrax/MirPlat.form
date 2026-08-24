import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { ItRebus } from "src/entities/activities/ItRebus/ItRebus.entity";
import { User } from "src/entities/user.entity";
import { ItRebusQuestions } from "src/entities/activities/ItRebus/ItRebusQuestions.entity";
import { Repository } from "typeorm";
import { checkOnReply, createAttempt, isAttemptExist } from "../helpers/attempt.helper";
import { Attempt } from "src/entities/attempt.entity";
import { DataSource } from "typeorm/browser";


export interface QuestionItem {
    questionId: number;
    answer: string;
}

@Injectable()
export class ItRebusService {
    constructor(
        @InjectRepository(ItRebus)
        private readonly itRebusRepo: Repository<ItRebus>,

        @InjectRepository(ItRebusQuestions)
        private readonly questionsRepo: Repository<ItRebusQuestions>,
        
        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async checkAnswer(user_answer: QuestionItem): Promise<boolean> {
        const question = await this.questionsRepo.findOneBy({ question_id: user_answer.questionId })

        if(!question) {
            throw new NotFoundException(`Question with id_${user_answer.questionId} does not exist `)
        }

        const right_answers = question.right_answers;

        if(!right_answers) {
            throw new NotFoundException(`Answers on question with id_${user_answer.questionId} do not exist `)
        }

        if(user_answer.answer in right_answers) {
            return true;
        } else {
            return false;
        }
    }

    async sendReward(user_id: number, countOfUserRightAnswers: number): Promise<void> {
        const maxQuestionCount = await this.getTotalQuestionCount(); 

        if(countOfUserRightAnswers < 0 || countOfUserRightAnswers > maxQuestionCount) {
            throw new BadRequestException('Invalid number of right questions')
        }

        const rebus = await this.itRebusRepo.findOneBy({name: 'ItRebus'});

        if(!rebus) {
            throw new NotFoundException('ItRebus activity does not exist')
        }

        const isAlreadyExist = await isAttemptExist(user_id, rebus.name, this.attemptRepo)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        const reward_per_answer = rebus.reward_per_answer;

        if(!reward_per_answer) {
            throw new NotFoundException('reward_per_answer does not exist in ItRebus')
        }

        const total_reward = reward_per_answer*countOfUserRightAnswers;

        try {
            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, user_id, total_reward, rebus.name);
                await manager.increment(User, { id: user_id }, 'balance', total_reward);
            });

        } catch {
            throw new InternalServerErrorException('Error during sending reward')
        }  
    }

    async checkOnReplyRebus(user_id: number): Promise<{ result: boolean }> {
        return checkOnReply(user_id, this.itRebusRepo, this.attemptRepo)
    }

    async getTotalQuestionCount(): Promise<number> {
        const questionsCount = await this.questionsRepo.count()

        if(questionsCount === 0) {
            throw new NotFoundException('Cannot find any questions')
        }

        return questionsCount
    }
} 