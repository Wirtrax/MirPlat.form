import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Attempt } from 'src/entities/attempt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attempt])],
  controllers: [AttemptsController],
  providers: [AttemptsService],
})
export class AttemptsModule {}
