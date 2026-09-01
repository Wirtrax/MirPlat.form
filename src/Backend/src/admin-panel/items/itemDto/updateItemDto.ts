import { IsString, IsNumber, IsBoolean, Min, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    quantity?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    is_active?: boolean;
}