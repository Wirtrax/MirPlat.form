import { Controller, Get, StreamableFile, Res, HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { DownloadService } from './download.service';
import type { Response } from 'express';

@Controller('excel')
export class ExcelExportController {
    constructor(
        private readonly downloadService: DownloadService,
    ) {}

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
            //throw new InternalServerErrorException('Ошибка скачивания файла')
        }
    }
}