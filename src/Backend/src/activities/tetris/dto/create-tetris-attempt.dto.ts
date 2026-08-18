import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateTetrisAttemptDto {
    @IsUrl({}, { message: 'photo_link must be correct URL' })
    @IsNotEmpty({ message: 'photo_link is missing' })
    photo_link: string;
}