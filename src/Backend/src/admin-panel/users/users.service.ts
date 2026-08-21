import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './userDto/createUserDto';
import { UpdateUserDto } from './userDto/updateUserDto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
            return this.usersRepo.find();
        }
    
    async addNewUser(userDto: CreateUserDto): Promise<User> {
        return this.usersRepo.save(userDto);
    }
    
    async deleteUser(id: number) {
        if(!await this.usersRepo.existsBy({id})) {
            throw new NotFoundException('Пользователь не найден');
        }
        await this.usersRepo.delete(id);
        return { success: true };
    }
    
    async updateUser(id: number, updateDto: Partial<UpdateUserDto>) {
        const result = await this.usersRepo.update(id, updateDto);
        if(result.affected === 0) {
            throw new NotFoundException('Пользователь не найден');
        }
        return { success: true };
    }

    async changeBalance(id: number, amount: number) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        if (user.balance + amount < 0) {
            throw new BadRequestException('Недостаточно средств на балансе');
        }
        await this.usersRepo.increment({ id }, 'balance', amount);
        return { success: true };
    }

    async getUser(userId: number): Promise<User> {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if(!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }
}
