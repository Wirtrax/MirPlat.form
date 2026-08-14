import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { Attempt } from 'src/entities/attempt.entity';
import { Activity } from 'src/entities/activity.entity';
import { Item } from 'src/entities/item.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Activity,Attempt,Item,Purchase])], // added other repos for initialization TODO: remove when other modules ready
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
