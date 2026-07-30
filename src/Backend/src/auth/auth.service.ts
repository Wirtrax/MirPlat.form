import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserProgrammingLevel } from "src/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async findOrCreateUser(tgUser: any): Promise<User> {
        const exists = await this.userService.isTelegramIdExists(tgUser.id);

        if(!exists) {
            // const createUserDto = {
            //     first_name: tgUser.firstName || 'User',
            //     last_name: tgUser.lastName || '',
            //     patronym: '',
            //     specialization: 'PM',
            //     programming_level: 'senjor',
            //     email: 'example@mail.test',
            //     phone_number: '+1234567890',
            //     send_notifications: false,
            // };
            const createUserDto = new CreateUserDto();
            createUserDto.first_name = tgUser.firstName || '';
            createUserDto.last_name = tgUser.lastName || '';
            createUserDto.patronym = '';
            createUserDto.specialization = 'PM';
            createUserDto.programming_level = UserProgrammingLevel.SENIOR;
            createUserDto.email = 'example@maшl.test';
            createUserDto.phone_number = '+1234567890';
            createUserDto.send_notifications = false;


            return await this.userService.create(createUserDto, tgUser.id);
        }

        const user = await this.userService.findOneByTelegramId(tgUser.id);

        if(!user) {
            throw new Error('Пользователь не найден в базе данных')
        }
        return user;
    }

    generateToken(userId: number): string {
        return this.jwtService.sign({ userId });
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.userService.findOneById(userId);
    }
}