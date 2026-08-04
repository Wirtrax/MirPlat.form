import { Controller, Get } from '@nestjs/common';
import { AttemptsService } from './attempts.service';

@Controller('attempts')
export class AttemptsController {
    constructor (private readonly attemptsService: AttemptsService) {}
    
    @Get()
    getAllAttempts() {
        return this.attemptsService.getAllAttempts();
    }
}
