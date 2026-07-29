import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserProgrammingLevel } from "src/entities/user.entity";

export class CreateUserDto {

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  patronym: string;

  @IsNotEmpty()
  specialization: string;

  @IsEnum(UserProgrammingLevel)
  programming_level: UserProgrammingLevel;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone_number: string;

  @IsNotEmpty()  
  send_notifications: boolean;
}
