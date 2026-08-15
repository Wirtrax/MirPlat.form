import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
    constructor() {}

    getYesterday(): Date {
        const day = new Date();
        day.setDate(day.getDate() - 1);
        return day;
    }

    getDateString(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1; // +1 потому что январь = 0
        return `${day}.${month}`;
    }
}