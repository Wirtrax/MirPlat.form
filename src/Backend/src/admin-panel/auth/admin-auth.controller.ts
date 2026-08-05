import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTAuth } from 'src/admin-panel/auth/decorators/jwt.decorator';

@Controller('auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.adminAuthService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: { login: string; password: string; role?: string }) {
    return this.adminAuthService.register(body.login, body.password, body.role as any);
  }

  @JWTAuth()
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}