import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { TelegramModule } from './telegram.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    UserModule,
    TelegramModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '10m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [JwtGuard, AuthService]
})
export class AuthModule {}
