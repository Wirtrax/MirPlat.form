import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { Body, Post,} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { QuizAnswersDto } from './dto/quiz-questions.dto';

@Controller('api/activities')
export class QuizController {
    constructor(private readonly quizService: QuizService){}
    
    @JWTAuth()
    @Post('quiz')
    sendReward(@Body() dto: QuizAnswersDto, @Req() request)  {
        const userId = request['userId'];
        
        return this.quizService.checkAnswersAndSendReward(userId, dto.answers);
    }

    @JWTAuth()
    @Get('quiz/status')
    checkAttempt(@Req() request){
        return this.quizService.checkOnReply(request['userId']);
    }
}
