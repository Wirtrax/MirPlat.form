import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './jwt.guard';

@Module({
imports:[
  UserService,
  JwtModule.register({
    global: true,
    secret: process.env.JWTSECRET,
    signOptions: { expiresIn: '10m' }
  })],
  providers: [JwtGuard],
  exports: [JwtGuard]
})
export class AuthModule {}
