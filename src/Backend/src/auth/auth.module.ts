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
    TelegramInitdataGuard    
  ],
  exports: [JwtGuard,TelegramInitdataGuard]
})
export class AuthModule {}
