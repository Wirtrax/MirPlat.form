import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber, Min } from "class-validator";
import { UserProgrammingLevel } from "../../../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name!: string;

    @IsString()
    @IsNotEmpty()
    last_name!: string;

    @IsString()
    @IsOptional()
    patronym!: string;

    @IsString()
    @IsNotEmpty()
    specialization!: string;

    @IsEnum(UserProgrammingLevel)
    programming_level!: UserProgrammingLevel;

    @IsEmail()
    email!: string;

    @IsMobilePhone()
    phone_number!: string;

    @IsBoolean()
    send_notifications!: boolean;

    @IsNumber()
    @Min(0)
    @IsOptional()
    balance!: number;    
}