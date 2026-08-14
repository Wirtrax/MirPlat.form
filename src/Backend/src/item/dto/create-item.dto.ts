import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateItemDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsBoolean()
  is_active: boolean;
}
