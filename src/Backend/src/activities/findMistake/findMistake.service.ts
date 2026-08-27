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

    async checkAnswer(user_answers: CodeAnswer[]): Promise<number> {
        let countOfRightAnswers = 0;

        for(const answer of user_answers) {
            const codeFragment = await this.codeFragmentRepo.findOneBy({ id: answer.id })

            if(!codeFragment) {
                throw new NotFoundException(`code fragment with id ${answer.id} does not exist`)
            }

            if(codeFragment.wrong_line_index === answer.indexInputLine) {
                countOfRightAnswers += 1;
            }
        }

        return countOfRightAnswers;
    }

    async sendReward(user_id: number, countOfUserRightAnswers: number): Promise<number> {
        const maxFragmentsCount = await this.getTotalFragmentCount(); 

        if(countOfUserRightAnswers < 0 || countOfUserRightAnswers > maxFragmentsCount) {
            throw new BadRequestException('Invalid number of right answers')
        }

        const find_mistake = await this.findMistakeRepo.findOne({ 
            order: { id: 'ASC' }
        });

        if(!find_mistake) {
            throw new NotFoundException('find_mistake activity does not exist')
        }

        const isAlreadyExist = await isAttemptExist(user_id, find_mistake.name, this.attemptRepo)

        if(isAlreadyExist) {
            throw new ForbiddenException('Attempt is already exist')
        }

        const reward_per_answer = find_mistake.reward_per_answer;

        if(!reward_per_answer) {
            throw new NotFoundException('reward_per_answer does not exist in find_mistake')
        }

        const total_reward = reward_per_answer*countOfUserRightAnswers;

        try {
            await this.dataSource.transaction(async manager => {
                await createAttempt(manager, user_id, total_reward, find_mistake.name);
                await manager.increment(User, { id: user_id }, 'balance', total_reward);
            });

            return total_reward;

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