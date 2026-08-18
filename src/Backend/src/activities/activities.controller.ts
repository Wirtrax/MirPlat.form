import { Body, Controller, Get, Post, UnprocessableEntityException} from '@nestjs/common';
import { Req } from '@nestjs/common';
import { TetrisService } from './tetris/tetris.service';
import { JWTAuth } from 'src/auth/jwt.decorator';
import { CreateTetrisAttemptDto } from './tetris/dto/create-tetris-attempt.dto';


@Controller('activities')
export class ActivitiesController {
    constructor(
    ) {}
}