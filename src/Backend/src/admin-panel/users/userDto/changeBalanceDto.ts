import { IsNumber } from 'class-validator';

export class ChangeBalanceDto {
    @IsNumber()
    amount!: number;
}