import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Module({
imports:[UserService]
})
export class AuthModule {}
