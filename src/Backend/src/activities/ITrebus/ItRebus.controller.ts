import { Body, Controller, Injectable, Post, Get, Req, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { JWTAuth } from "src/auth/jwt.decorator";
import { ItRebusService } from "./ItRebus.service";
import { QuestionItemDto } from "./dto/answer.dto";
import { JwtGuard } from "src/auth/jwt.guard";
import { SendRewardDto } from "./dto/reward.dto";

@Controller('api/activities')
export class ItRebusController {
    constructor(
        private itRebusService: ItRebusService
    ) {}

    @JWTAuth()
    @Get('it_rebus_status')
    async checkAttempt(@Req() request) {
        return this.itRebusService.checkOnReplyRebus(request['userId'])
    }

    @JWTAuth()
    @Post('it_rebus')
    async checkAnswer(
        @Body() questionItemDto: QuestionItemDto,
    ) {
        const answer = questionItemDto;
        try {
            const isAnswerRight = await this.itRebusService.checkAnswer(answer)
            return isAnswerRight
        } catch(error) {
            throw new InternalServerErrorException('Error during checking answer')
        }
    }

    @JWTAuth()
    @Post('it_rebus/reward')
    async getItRebusreward(
        @Body() sendRewardDto: SendRewardDto,
        @Req() request,
    ) {
        const userId = request['userId'];
        const countOfRightAnswers = sendRewardDto.countOfRightAnswers;

        if (typeof userId !== 'number' || isNaN(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            this.itRebusService.sendReward(userId, countOfRightAnswers)
        } catch(error) {
            throw new InternalServerErrorException('')
        }
    }
} 