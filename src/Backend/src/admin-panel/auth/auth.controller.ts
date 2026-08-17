import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

export class LoginDto {
    login!: string;
    password!: string;
}
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //@Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.login, dto.password);
    }

    //@UseGuards(JwtGuard, RolesGuard, SuperAdminGuard)
    @Post('register')
    register(@Body() dto: LoginDto) {
        return this.authService.register(dto.login, dto.password);
    }
}
