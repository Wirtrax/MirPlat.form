import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './jwt.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TelegramInitdataGuard } from './telegram-initdata.guard';

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '10m' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtGuard,
    {
      provide: TelegramInitdataGuard,
      useFactory: () => {
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) {
          throw new Error('TELEGRAM_BOT_TOKEN не задан в .env')
        }
        return new TelegramInitdataGuard(botToken)
      }
    }
  ],
  exports: [JwtGuard, AuthService]
})
export class AuthModule {}
