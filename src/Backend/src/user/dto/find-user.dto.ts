import { IsOptional } from "class-validator";

export class FindUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  telegram_id: number;
  
}
