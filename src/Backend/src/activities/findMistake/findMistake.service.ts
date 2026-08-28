import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { checkOnReply, createAttempt, isAttemptExist } from "../helpers/attempt.helper";
import { Attempt } from "src/entities/attempt.entity";
import { DataSource } from "typeorm/browser";
import { FindMistake } from "src/entities/activities/findMistake/findMistake.entity";
import { CodeFragment, Difficulty } from "src/entities/activities/findMistake/code-fragment.entity";

export interface CodeFragmentForExport {
    id: number,
    difficulty: Difficulty;
    codeLines: string[];
}

interface CodeAnswer {
    id: number,
    indexInputLine: number,
}

@Injectable()
export class FindMistakeService {
    private readonly FIND_MISTAKE_NAME = 'findMistake';

    constructor(
        @InjectRepository(FindMistake)
        private readonly findMistakeRepo: Repository<FindMistake>,

        @InjectRepository(CodeFragment)
        private readonly codeFragmentRepo: Repository<CodeFragment>,
        
        @InjectRepository(Attempt)
        private readonly attemptRepo: Repository<Attempt>,

        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    async getCodeFragments() {
        const codeFragments = await this.codeFragmentRepo.find();

        if(codeFragments.length === 0) {
            throw new NotFoundException('No code fragments to send')
        }

        const result: CodeFragmentForExport[] = codeFragments.map(code => ({
            id: code.id,
            difficulty: code.difficulty,
            codeLines: code.code_lines
        }));

        return result;
    }

    async checkAnswerAndSendReward(
        user_id: number, 
        user_answers: CodeAnswer[]
    ): Promise<{
        count: number, 
        reward: number
    }> {
        let reward = 0;
        let countOfRightAnswers = 0;
        
        const find_mistake = await this.findMistakeRepo.findOne({ 
            where: {},
            order: { id: 'ASC' }
        });

        if(!find_mistake) {
            throw new NotFoundException('find_mistake activity does not exist')
        }

        const isAlreadyExist = await isAttemptExist(user_id, find_mistake.name, this.attemptRepo)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        for(const answer of user_answers) {
            const codeFragment = await this.codeFragmentRepo.findOneBy({ id: answer.id })

            if(!codeFragment) {
                throw new NotFoundException(`code fragment with id ${answer.id} does not exist`)
            }

            if(codeFragment.wrong_line_index === answer.indexInputLine) {
                if(codeFragment.difficulty == Difficulty.EASY) {
                    reward += find_mistake.reward_easy;
                    countOfRightAnswers++;
                } else if(codeFragment.difficulty === Difficulty.MEDIUM) {
                    reward += find_mistake.reward_medium;
                    countOfRightAnswers++;
                } else if(codeFragment.difficulty === Difficulty.HARD) {
                    reward += find_mistake.reward_hard;
                    countOfRightAnswers++;
                }
            }
        }

        try {
            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, user_id, reward, find_mistake.name);
                await manager.increment(User, { id: user_id }, 'balance', reward);
            });

            return {
                count: countOfRightAnswers,
                reward: reward,
            };
        } catch {
            throw new InternalServerErrorException('Error during sending reward')
        }  
    }

    async checkOnReplyFindMistake(user_id: number): Promise<{ result: boolean }> {
        return checkOnReply(user_id, this.findMistakeRepo, this.attemptRepo)
    }

    async getTotalFragmentCount(): Promise<number> {
        const questionsCount = await this.codeFragmentRepo.count()

        if(questionsCount === 0) {
            throw new NotFoundException('Cannot find any questions')
        }

        return questionsCount
    }
} 