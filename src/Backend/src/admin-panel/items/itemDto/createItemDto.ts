import { IsString, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreateItemDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsString()
    image!: string;

    @IsNumber()
    @Min(0)
    quantity!: number;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsBoolean()
    is_active!: boolean;
}