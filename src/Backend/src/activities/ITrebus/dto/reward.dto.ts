import { IsArray, ValidateNested, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SendRewardDto {
    @IsNumber({}, { message: 'countOfRightAnswer must be a number' })
    @IsNotEmpty({ message: 'countOfRightAnswer is required' })
    countOfRightAnswers: number;
}