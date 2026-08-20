import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItRebus } from 'src/entities/activities/ItRebus/ItRebus.entity';
import { ItRebusQuestions } from 'src/entities/activities/ItRebus/ItRebusQuestions';
import { Attempt } from 'src/entities/attempt.entity';
import { ItRebusService } from './ItRebus.service';
import { ItRebusController } from './ItRebus.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity'; // предположительно путь к User

@Module({
  imports: [
    TypeOrmModule.forFeature([
        ItRebus, 
        ItRebusQuestions, 
        Attempt, 
        User,
    ]), 
  ],
  providers: [ItRebusService],
  controllers: [ItRebusController]
})
export class ItRebusModule {}