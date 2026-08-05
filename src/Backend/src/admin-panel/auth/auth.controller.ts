import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

export class LoginDto {
    login!: string;
    password!: string;
}
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.login, dto.password);
    }

    @Post('register')
    register(@Body() dto: LoginDto) {
        return this.authService.register(dto.login, dto.password);
    }
}
