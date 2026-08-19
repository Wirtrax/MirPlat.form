import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoCheck } from 'src/entities/activities/photo-check.entity';
import { PhotoCheckController } from './photo-check.controller';
import { PhotoCheckService } from './photo-check.service';
import { User } from 'src/entities/user.entity';
import { Activity } from 'src/entities/activity.entity';
import { Attempt } from 'src/entities/attempt.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    PhotoCheck,
    User,
    Activity,
    Attempt,
    ])],
  providers: [PhotoCheckService],
  controllers: [PhotoCheckController],
  exports: [PhotoCheckModule]
})
export class PhotoCheckModule {}
