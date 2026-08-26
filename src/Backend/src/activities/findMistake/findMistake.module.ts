import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attempt } from 'src/entities/attempt.entity';
import { FindMistakeService } from './findMistake.service';
import { FindMistakeController } from './findMistake.controller';
import { User } from 'src/entities/user.entity';
import { FindMistake } from 'src/entities/activities/findMistake/findMistake.entity';
import { CodeFragment } from 'src/entities/activities/findMistake/code-fragment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FindMistake,
      CodeFragment,
      Attempt, 
      User,
    ]), 
  ],
  providers: [FindMistakeService],
  controllers: [FindMistakeController]
})
export class FindMistakeModule {}