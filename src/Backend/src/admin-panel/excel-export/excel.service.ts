import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as path from 'path'
import * as fs from 'fs'
import { SqlService, IUserLoginStats, IActivityParticipantsStats } from './SQL.service'
import { DateService } from './date.service'
import * as lockfile from 'proper-lockfile'

const HEADERS = [
    'Телефон',
    'Email', 
    'Согласие на рассылку', 
    'Имя', 
    'Фамилия', 
    'Отчество', 
    'Уровень программирования', 
    'Специализация',
    '', 
    'Активность', 
    'Участники',
];

const USERS_FIELD_ORDER = [
    'phone_number',
    'email',
    'send_notifications',
    'first_name',
    'last_name',
    'patronym',
    'programming_level',
    'specialization'
];

@Injectable()
export class ExcelService {
    constructor(
        private readonly sqlService: SqlService,
        private readonly dateService: DateService,
    ) {}

    /**
     * Записывает таблицу user в таблицу
     * @param date 
     * @param sheet 
     * @param fieldOrder - списпок полей, необходимых для таблицы
     * @returns users.length - Число пользоватлей, которые были внесены в таблицу
     */
    async loadUsersToSheet(
        users: IUserLoginStats[],
        sheet: ExcelJS.Worksheet,
        fieldOrder: string[] = USERS_FIELD_ORDER,
    ): Promise<number> {
        users.forEach((user, index) => {
            const row = sheet.getRow(index + 2); //Индексация с 1 и заголовки

            fieldOrder.forEach((field, colIndex) => {
                const cell = row.getCell(colIndex + 1)
                cell.value = user[field];// Индексация с 1

                this.customizeCell(cell)
            })
        })

        console.log(`Пользователи ${users.length} внесены в таблицу`)

        return users.length
    }

    /**
     * Записывает наименование активности и число её участников за дату в таблицу
     * @param date 
     * @param sheet 
     * @param headers - список всех заголоаков, нужен для праильного отображения
     */
    private async loadActivitiesToSheet(
        activities: IActivityParticipantsStats[],
        sheet: ExcelJS.Worksheet,
        headers: string[] = HEADERS,
    ): Promise<number> {
        activities.forEach((activity, index) => {
            const rowNumber = index + 2;
            const row = sheet.getRow(rowNumber);

            const activityColNumber = headers.length - 1;
            const participantsColNumber = headers.length;  
            
            const cell_activity = row.getCell(activityColNumber);
            const cell_participants = row.getCell(participantsColNumber);

            cell_activity.value = activity.activity_name;
            cell_participants.value = activity.participants_count;

            this.customizeCell(cell_activity);
            this.customizeCell(cell_participants);
        })

        console.log(`Активности ${activities.length} внесены в таблицу`)

        return activities.length
    };

    /**
     * Считывает файл или создаёт новый и возвращает workbook
     * @param filePath 
     * @param date 
     * @returns {ExcelJS.Workbook}
     */
    private async loadOrCreateWorkbook(filePath: string, date: Date): Promise<ExcelJS.Workbook> {
        const workbook = new ExcelJS.Workbook();
        const fileExists = fs.existsSync(filePath) && fs.statSync(filePath).isFile() && fs.statSync(filePath).size > 0;

        if (fileExists) {
            try {
                await workbook.xlsx.readFile(filePath);
                console.log('Файл считан')
                
            } catch (error) {
                throw error
            }

        } else {
            console.log('Файла не существует, создаём новый')
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }

        return workbook;
    }

    /**
     * Создаёт новый лист по дате, удаляет старый с таким же именем, если он существует
     * @param workbook 
     * @param date 
     * @returns {ExcelJS.Worksheet}
     */
    private createWorksheet(workbook: ExcelJS.Workbook, date: Date): ExcelJS.Worksheet {
        const sheetName = this.dateService.getDateString(date);
        let sheet = workbook.getWorksheet(sheetName);

        if(sheet) {
            workbook.removeWorksheet(sheet.id)
        }

        sheet = workbook.addWorksheet(sheetName);

        return sheet;
    }

    /**
     * Декорирует ячейку таблицы
     * @param cell 
     */
    private customizeCell (cell : ExcelJS.Cell): void {
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        cell.font = {size: 11}
    };

    /**
     * Создаёт первую строку с наименованиями 
     * @param sheet
     * @param headers 
     * @param startRow 
     * @param startCol 
     */
    private createHeaders(
        sheet: ExcelJS.Worksheet,
        headers: string[],
        startRow: number = 1,
        startCol: number = 1
    ): void {
        const headerRow = sheet.getRow(startRow)

        headers.forEach((header, index) => {
            const col = startCol + index;
            headerRow.getCell(col).value = header
            headerRow.getCell(col).border = {
                left: { style: 'thin' },
                bottom: { style: 'medium' },
                right: { style: 'thin' }
            }
        });

        headerRow.font = {bold: true, size: 11}
        headerRow.alignment = { horizontal: "left", vertical: 'middle'};
        headerRow.height = 20;
    };

    /**
     * Устанавливает автоматическую ширину колонки по наибольшей длинне клетки
     * @param sheet 
     * @param minWidth 
     */
    private autofitColumns(sheet: ExcelJS.Worksheet, minWidth: number = 10): void {
        sheet.columns.forEach((column) => {
            let maxCharacterLength = minWidth;

            column.eachCell?.({ includeEmpty: false }, (cell) => {
                if (Number(cell.row) !== 1 && cell.value !== null && cell.value !== undefined) {
                    const cellLength = String(cell.value).length;
                    
                    if (cellLength > maxCharacterLength) {
                        maxCharacterLength = cellLength;
                    }
                }
            });

            column.width = maxCharacterLength + 3;
        });
    }

    /**
     * Функция обеспечивает корректное обращение и запись файла таблицы
     * для получения workbook, с которым работаем потом
     * @param date - день за который нужно вывести данные
     * @param filePath - путь к файлу таблицы
     */
    async loadWorkbook(filePath: string, date: Date) {
        try {
            const workbook = await this.loadOrCreateWorkbook(filePath, date);
            console.log('Книга создана')

            await this.addDateSheet(date, workbook);
            console.log('Страница с данными добавлена в книгу')

            await workbook.xlsx.writeFile(filePath);
            console.log(`Книга загружена ${filePath}`)
            
        } catch (error) {
            throw error;
        }
    }

    /**
     * Загружает данные по запросам из таблиц в эксель и оформляет их
     * @param date 
     * @param workbook 
     */
    async addDateSheet(date: Date, workbook: ExcelJS.Workbook) {
        const worksheet = this.createWorksheet(workbook, date);

        this.createHeaders(worksheet, HEADERS)

        const users = await this.sqlService.getUsersByTodayLogin(date);
        const activities = await this.sqlService.getActivitiesByDate(date);

        await this.loadUsersToSheet(users, worksheet);      
        await this.loadActivitiesToSheet(activities, worksheet);

        if(users.length <= 0) {
            workbook.removeWorksheet(this.dateService.getDateString(date))
        }

        this.autofitColumns(worksheet)
    }
}