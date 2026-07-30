import { Controller, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { TelegramInitdataGuard } from './telegram-initdata.guard';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @UseGuards(TelegramInitdataGuard)
    async signin(@Req() req: Request, @Res() res: Response) {
        const tgUser = req['tgUser'];
        const user = await this.authService.findOrCreateUser(tgUser);
        const token = this.authService.generateToken(user.id);

        return res.json({
            success: true,
            token: token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            }
        });
    }

    @Get('me')
    @UseGuards(JwtGuard)
    async me(@Req() req: Request, @Res() res: Response) {
        const userId = req['payload']?.userId;
        const user = await this.authService.getUserById(userId);
        
        if (!user) {
            return res.status(401).json({ error: 'Пользователь не найден' });
        }

        return res.json({
            authenticated: true,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
            }
        });
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Res() res: Response) {
        return res.json({
            success: true,
            message: 'Успешно вышли из системы'
        })
    }
}