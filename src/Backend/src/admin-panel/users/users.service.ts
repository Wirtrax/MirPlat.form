import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Item } from '../../entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>
    ) {}

    async getAllUsers(): Promise<User[]> {
            return this.usersRepo.find();
        }
    
        async addNewUser(user: User): Promise<User> {
            return this.usersRepo.save(user);
        }
    
        async deleteUser(id: number) {
            if(!await this.usersRepo.existsBy({id})) {
                throw new NotFoundException('Пользователь не найден');
            }
            await this.usersRepo.delete(id);
            return { success: true };
        }
    
        async updateUser(id: number, changes: Partial<User>) {
            const result = await this.usersRepo.update(id, changes);
            if(result.affected === 0) {
                throw new NotFoundException('Пользователь не найден');
            }
            return { success: true };
        }
}
