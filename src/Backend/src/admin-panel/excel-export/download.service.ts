import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ExcelService } from './excel.service';
import { DateService } from './date.service';
import { Cron, CronExpression} from '@nestjs/schedule';

@Injectable()
export class DownloadService {
    private readonly EXCEL_PATH = './exports/export.xlsx';
    private readonly EXPORTS_DIR = path.dirname(this.EXCEL_PATH);

    constructor(
        private readonly excelService: ExcelService,
        private readonly dateService: DateService,
    ) {}

    /**
     * Функция генерирует отчёт за вчерашний вечер в полночь
     */
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async generateFileAtMidnight() {
        try {
            const yesterday = this.dateService.getYesterday();

            await this.generateExcelFile(yesterday);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Функция генерации excel отчёта по запросу пользователя
     * @returns буфер на скачивание и имя файла
     */
    async getExcelFile(): Promise<{ buffer: Buffer; filename: string}> {
        try {
            if (!fs.existsSync(this.EXPORTS_DIR)) {
                
                fs.mkdirSync(this.EXPORTS_DIR, { recursive: true });
            }

            const today = new Date();

            await this.generateExcelFile(today);

            const buffer = await fs.promises.readFile(this.EXCEL_PATH);
            const filename = path.basename(this.EXCEL_PATH);

            return { buffer, filename }
        } catch {
            throw new InternalServerErrorException('Не удалось получить Excel файл');
        } 
    }


    private async generateExcelFile(date: Date): Promise<void> {
        try {
            await this.excelService.loadWorkbook(this.EXCEL_PATH, date);
        } catch (error) {
            throw new InternalServerErrorException('Не удалось создать Excel файл');
        }
    }
}