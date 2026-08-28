import { Body, Query, Controller, Injectable, Post, Get, Req, BadRequestException, NotFoundException, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { JWTAuth } from "src/auth/jwt.decorator";
import { CardGame4x4Service } from "./card-game-4x4.service";
import { CardGameResultDto } from "./dto/card-game-result.dto";

@Controller('api/activities')
export class CardGame4x4Controller {
    constructor(
        private cardGame4x4Service: CardGame4x4Service,
    ) {}

    @JWTAuth()
    @Get('card_game_4x4')
    async getCardGroup() {
        try {
            return this.cardGame4x4Service.getCardGroups()
        } catch(error) {
            if (error instanceof NotFoundException ||
                error instanceof ForbiddenException
            ) {
                throw error;
            }

            throw new InternalServerErrorException('Unexpected error durin getCardGroup')
        }
    }

    @JWTAuth()
    @Get('card_game_4x4_status')
    async checkAttempt(@Req() request) {
        return this.cardGame4x4Service.checkOnReplyCardGame4x4(request['userId'])
    }

    @JWTAuth()
    @Post('card_game_4x4')
    async checkAnswers(
        @Body() cardGameResultDto: CardGameResultDto,
        @Req() request,
        //@Query('userId') user_id: string, // УДАЛИТЬ
    ) {
        //const user_id_num = parseInt(user_id, 10) //УДАЛИТЬ 
        //const userId = user_id_num; // УДАЛИТЬ

        const userId = request['userId'];
        const count_of_guesed_group = cardGameResultDto.count_of_guesed_group;

        if (typeof userId !== 'number' || isNaN(userId)) {
            throw new BadRequestException('Invalid user ID');
        }

        try {
            const reward = await this.cardGame4x4Service.sendReward(userId, count_of_guesed_group)

            return {
                reward: reward,
            }
        } catch(error) {
            if (error instanceof NotFoundException ||
                error instanceof ForbiddenException ||
                error instanceof BadRequestException ||
                error instanceof InternalServerErrorException
            ) {
                throw error;
            } 
            throw new InternalServerErrorException('Error during sending reward')
        }
    }
} 