import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { CardGame4x4Service, } from './card-game-4x4.service';
import { CardGame4x4Controller } from './card-game-4x4.controller';
import { User } from 'src/entities/user.entity';
import { CardGroup } from 'src/entities/activities/4x4/card-group.entity';
import { CardGame4x4 } from 'src/entities/activities/4x4/card-game-4x4.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        CardGame4x4, 
        CardGroup, 
        Attempt, 
        User,
    ]), 
  ],
  providers: [CardGame4x4Service],
  controllers: [CardGame4x4Controller]
})
export class CardGame4x4Module {}