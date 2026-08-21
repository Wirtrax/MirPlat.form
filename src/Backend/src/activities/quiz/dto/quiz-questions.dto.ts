import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
    @IsNumber()
    questionId!: number;

    @IsString()
    answer!: string;
}

export class QuizAnswersDto {
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => AnswerDto)
    answers!: AnswerDto[];
}