import { Controller, Get, StreamableFile, Res, UseGuards } from '@nestjs/common';
import { DownloadService } from './download.service';
import type { Response } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('excel')
export class ExcelExportController {
    constructor(
        private readonly downloadService: DownloadService,
    ) {}

    @UseGuards(JwtGuard, RolesGuard)
    @Get('download')
    async downloadExcel(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        try {
            const { buffer, filename } = await this.downloadService.getExcelFile();

            const encodedFilename = encodeURIComponent(filename);

            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            throw error
        }
    }
}