import { Controller, Post, Req, UseGuards, ForbiddenException, HttpCode } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { TelegramInitdataGuard } from './telegram-initdata.guard';
import { UserService } from 'src/user/user.service';
import { ApiAcceptedResponse, ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiSecurity, ApiUnauthorizedResponse, ApiUriTooLongResponse } from '@nestjs/swagger';
import { TelegramInitDataAuth } from './tma.decorator';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('signin')
    @HttpCode(200)
    @ApiOkResponse({example: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4NTUwODk1NywiZXhwIjoxNzg1NTA5NTU3fQ.bTDtdgoWINTisNpylfhL8iRjFko7ZV22NOlYqcH5npo"}})
    @ApiForbiddenResponse({description:"Initdata is valid, but user doesn't exist yet. Create user at /api/user first"})
    @TelegramInitDataAuth()
    async signin(@Req() req: Request) {
        const tgUserId = req['tgUserId'];
        const user = await this.userService.findOneByTelegramId(tgUserId);
        
        if (user === null){
            throw new ForbiddenException("User is not registred");
        }

        return {token:this.authService.generateToken(user.id)};
    }
}
