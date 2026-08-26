import { Body, Controller, Injectable, Post, Get, Req, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { JWTAuth } from "src/auth/jwt.decorator";
import { FindMistakeService } from "./findMistake.service";
import { CodeAnswersDto } from "./dto/code-answers.dto";

@Controller('api/activities')
export class FindMistakeController {
    constructor(
        private findMistakeService: FindMistakeService
    ) {}

    @JWTAuth()
    @Get('find_mistake_status')
    async checkAttempt(@Req() request) {
        return this.findMistakeService.checkOnReplyFindMistake(request['userId'])
    }

    @JWTAuth()
    @Get('find_mistake')
    async getCodeFragments() {
        const result = await this.findMistakeService.getCodeFragments();
        return result;
    }

    @JWTAuth()
    @Post('find_mistake')
    async checkAnswer(
        @Body() codeAnswersDto: CodeAnswersDto,
        @Req() request,
    ) {
        const userId = request['userId'];
        const codeAnswers = codeAnswersDto.answers;

        if (typeof userId !== 'number' || isNaN(userId)) {
            throw new BadRequestException('Invalid user ID');
        }
        
        try {
            const countOfRightAnswers = await this.findMistakeService.checkAnswer(codeAnswers);
            await this.findMistakeService.sendReward(userId, countOfRightAnswers);
        } catch(error) {
            throw new InternalServerErrorException('Error during checking answers or sending reward')
        }
    }
} 