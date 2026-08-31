import { IsString, IsNumber, IsBoolean, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateItemDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @Type(() => Number) 
    @IsNumber()
    @Min(0)
    quantity!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price!: number;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    is_active!: boolean;
}