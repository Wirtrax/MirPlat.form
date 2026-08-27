import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AttemptStatus } from 'src/entities/attempt.entity';

@Controller('attempts')
export class AttemptsController {
    constructor (private readonly attemptsService: AttemptsService) {}
    
    //@UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllAttempts() {
        return this.attemptsService.getAllAttempts();
    }
    //@UseGuards(JwtGuard, RolesGuard)
    @Get('by-user/:id')
    getAttemptsByUserId(@Param('id', ParseIntPipe) userId: number) {
        return this.attemptsService.getAttemptsByUserId(userId)
    }
    //@UseGuards(JwtGuard, RolesGuard)
    @Get(':id')
    getAttemptById(@Param('id') attemptId: number) {
        return this.attemptsService.getAttempt(attemptId);
    }

    //@UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    changeStatus(
        @Param('id', ParseIntPipe) attemptId: number, 
        @Body('status') attemptStatus: AttemptStatus
    ) {
        return this.attemptsService.changeStatus(attemptId, attemptStatus)
    }
}
