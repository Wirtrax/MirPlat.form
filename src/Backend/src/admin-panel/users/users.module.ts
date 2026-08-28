import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Purchase } from 'src/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Purchase])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
