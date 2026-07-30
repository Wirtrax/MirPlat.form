import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findOneById(id: number): Promise<User | null> {
     return this.usersRepo.findOneBy({id});
  }

  isTelegramIdExists(telegram_id: number): Promise<boolean> {
    return this.usersRepo.existsBy({telegram_id});
  }

  findOneByTelegramId(telegramId: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ telegram_id: telegramId });
  }

  create(createUserDto: CreateUserDto, telegram_id: number): Promise<User>{
    const user = this.usersRepo.create({...createUserDto, telegram_id});
    return this.usersRepo.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }

  async update(updateUserDto: UpdateUserDto, id: number): Promise<void>{
    await this.usersRepo.update({id}, updateUserDto);
  }
  
}
