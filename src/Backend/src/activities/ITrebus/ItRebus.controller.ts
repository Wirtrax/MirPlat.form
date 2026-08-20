import { Body, Controller, Injectable, Post, Req, BadRequestException } from "@nestjs/common";
import { JWTAuth } from "src/auth/jwt.decorator";
import { ItRebusService } from "./ItRebus.service";
import { request } from "http";
import { SubmitAnswersDto } from "./dto/answer.dto";
import { ItRebusQuestions } from "src/entities/activities/ItRebus/ItRebusQuestions";

@Controller('api/activities')
export class ItRebusController {
    constructor(
        private itRebusService: ItRebusService
    ) {}

    @JWTAuth()
    @Post('it_rebus_status')
    async checkAttempt(@Req() request) {
        return this.itRebusService.checkOnReplyRebus(request['userId'])
    }

    @JWTAuth()
    @Post('it_rebus')
    async checkAnswers(
        @Body() submitAnswersDto: SubmitAnswersDto,
        @Req() request,
    ) {
        const userId = request['userId'];
        const answers = submitAnswersDto.answers;

        if (typeof userId !== 'number' || isNaN(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            const countOfRightAnswers = await this.itRebusService.checkAnswers(answers)

            await this.itRebusService.sendReward(userId, countOfRightAnswers)

            return {
                succses: true,
                rightAnswersCount: countOfRightAnswers,
            }
        } catch(error) {
            return {
                succses: false,
                message: `fall with error: ${error}`
            }
        }
    }
} 