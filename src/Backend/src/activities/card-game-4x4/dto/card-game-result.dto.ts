import { IsNotEmpty, IsNumber } from 'class-validator';

export class CardGameResultDto {
    @IsNumber({}, {message: "count_of_guesed_group must be a number"})
    @IsNotEmpty({ message: "count_of_guesed_group is required" })
    count_of_guesed_group: number;
}