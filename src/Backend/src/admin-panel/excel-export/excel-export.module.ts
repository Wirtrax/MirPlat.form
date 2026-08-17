import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ExcelExportController } from './excel-export.controller';
import { User } from '../../entities/user.entity';
import { Activity } from '../../entities/activity.entity';
import { SqlService } from './SQL.service';
import { DateService } from './date.service';
import { DownloadService } from './download.service';
import { ExcelService } from './excel.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Activity]),
        ScheduleModule.forRoot(),
    ],
    controllers: [ExcelExportController],
    providers: [
        SqlService,
        DateService,
        ExcelService,
        DownloadService,
    ],
    exports: []
})
export class ExcelExportModule {}