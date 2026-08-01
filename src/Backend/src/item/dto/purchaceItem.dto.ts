import { IsNumber } from "class-validator";

export class PurchaseItemDto {
  @IsNumber()
  id: number; 
}
