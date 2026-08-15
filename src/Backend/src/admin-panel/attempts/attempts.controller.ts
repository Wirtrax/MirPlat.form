import { Controller, Get, UseGuards } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('attempts')
export class AttemptsController {
    constructor (private readonly attemptsService: AttemptsService) {}
    
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    getAllAttempts() {
        return this.attemptsService.getAllAttempts();
    }
}
