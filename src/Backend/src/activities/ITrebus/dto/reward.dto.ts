import { IsArray, ValidateNested, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class SendRewardDto {
    @IsNumber({}, { message: 'questionId must be a number' })
    @IsNotEmpty({ message: 'questionId is required' })
    countOfRightAnswers: number;
}