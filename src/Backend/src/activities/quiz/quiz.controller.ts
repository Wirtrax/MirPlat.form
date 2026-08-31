import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
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
    sendReward(@Body() dto: QuizAnswersDto, @Req() request,
    //@Query('userId') user_id: string, // УДАЛИТЬ
    ) {
        //const user_id_num = parseInt(user_id, 10) //УДАЛИТЬ 
        //const userId = user_id_num; // УДАЛИТЬ
        const userId = request['userId'];
        
        return this.quizService.checkAnswersAndSendReward(userId, dto.answers);
    }

    @JWTAuth()
    @Get('quiz_status')
    checkAttempt(@Req() request){
        return this.quizService.checkOnReply(request['userId']);
    }
}
