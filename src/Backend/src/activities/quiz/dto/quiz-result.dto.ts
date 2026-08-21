import { IsBoolean } from 'class-validator';

export class QuizResultDto {
    @IsBoolean()
    success!: boolean;
}