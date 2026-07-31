import { Controller, Post, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { TelegramInitdataGuard } from './telegram-initdata.guard';
import { UserService } from 'src/user/user.service';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('signin')
    @UseGuards(TelegramInitdataGuard)
    async signin(@Req() req: Request) {
        const tgUserId = req['tgUserId'];
        const user = await this.userService.findOneByTelegramId(tgUserId);
        
        if (user === null){
            return new ForbiddenException("User is not registred");
        }

        return this.authService.generateToken(user.id);
    }
}
