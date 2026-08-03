import { IsNumber } from "class-validator";

export class CreatePurchaseDto {
  @IsNumber()
  item_id: number;
}
