import { Controller, ParseIntPipe } from '@nestjs/common';
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
        return this.quizService.sendReward(userId);
}
}
