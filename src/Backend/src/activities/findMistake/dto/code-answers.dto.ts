import { IsInt, IsPositive, IsArray, ArrayMinSize, ValidateNested, Min} from 'class-validator';
import { Type } from 'class-transformer';

export class CodeAnswerDto {
    @IsInt()
    @IsPositive()
    id: number;

    @IsInt()
    @Min(0)
    indexInputLine: number;
}

export class CodeAnswersDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CodeAnswerDto)
    answers: CodeAnswerDto[];
}