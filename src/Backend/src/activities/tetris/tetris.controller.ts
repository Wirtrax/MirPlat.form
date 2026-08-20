import { Body, Controller, Get, InternalServerErrorException, Post, UnprocessableEntityException} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { TetrisService } from './tetris.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { CreateTetrisAttemptDto } from './dto/create-tetris-attempt.dto';


@Controller('api/activities')
export class TetrisController {
    constructor(
        private readonly tetrisService: TetrisService
    ) {}

    @JWTAuth()// Мы же можем испольховать такой уровень защиты...
    @Get('tetris')
    async getTetrisReference(): Promise<{ link: string }> {
        try {
            const link = await this.tetrisService.getLinkOfTetrisReference();
            return {link}            
        } catch(error) {
            throw error;
        }

    }

    @JWTAuth()
    @Post('tetris')
    async postTetrisSolution(
        @Req() req: Request,
        @Body() createTetrisAttemptDto: CreateTetrisAttemptDto,
    ): Promise<{message : string}> {
        const userId = req['userId'];

        if (!userId) {
            throw new UnprocessableEntityException('userId is not authenticated')
        }

        if (typeof userId !== 'number') {
            throw new UnprocessableEntityException('userId should be number')
        }

        try {
            await this.tetrisService.createTetrisAttempt(
                userId, 
                createTetrisAttemptDto.photo_link,
            );

            return { message: 'Tetris solution sumbitted successfully' };         
        } catch(error) {
            throw new InternalServerErrorException('Error during sending tetris solution');
        }
    }

    @JWTAuth()
    @Post('tetris_status')
    async checkAttempt(@Req() request) {
        return this.tetrisService.checkOnReplyTetris(request['userId'])
    }
}