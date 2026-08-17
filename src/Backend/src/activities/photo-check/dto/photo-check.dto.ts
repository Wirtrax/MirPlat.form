import { IsBoolean, IsNotEmpty } from 'class-validator';

export class PhotoCheckDto {
    @IsBoolean({ message: 'flag is not boolean'})
    @IsNotEmpty({ message: 'flag is missing' })
    flag: boolean;
}