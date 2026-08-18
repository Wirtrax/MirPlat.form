import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { Param, Post,} from '@nestjs/common';
import { Req } from '@nestjs/common';

@Controller('activities')
export class QuizController {
    constructor(private readonly quizService: QuizService){}
    
    @JWTAuth()
    @Post('quiz')
    sendReward(@Req() request) {
        const userId = request['userId'];
        try {
            return this.quizService.sendReward(userId);
        }
        catch(error) {
            'Вознила непридвиденная ошибка';
        }
    }

    @JWTAuth()
    @Get('quiz')
    checkAttempt(@Req() request){
        return this.quizService.checkOnReply(request['userId']);
    }
}
