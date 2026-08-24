import { IsArray, ValidateNested, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionItemDto {
    @IsNumber({}, { message: 'questionId must be a number' })
    @IsNotEmpty({ message: 'questionId is required' })
    questionId: number;

    @IsString({ message: 'answer must be a string' })
    @IsNotEmpty({ message: 'answer is required' })
    answer: string;
}

export class SubmitAnswersDto {
    @IsArray({ message: 'answers must be an array' })
    @ValidateNested({ each: true })
    @Type(() => QuestionItemDto)
    answers: QuestionItemDto[];
}