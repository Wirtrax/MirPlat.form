import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
     return this.usersRepo.findOne({where: {id}, relations: {purchases:true, attempts: true}});
  }

  isTelegramIdExists(telegram_id: string): Promise<boolean> {
    return this.usersRepo.existsBy({telegram_id});
  }

  findOneByTelegramId(telegram_id: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ telegram_id});
  }

  create(createUserDto: CreateUserDto, telegram_id: string): Promise<User>{
    const user = this.usersRepo.create({...createUserDto, telegram_id});
    return this.usersRepo.save(user).catch((err) =>{
      throw new InternalServerErrorException("Failed to create a user")
    });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }

  async update(updateUserDto: UpdateUserDto, id: number): Promise<void>{
    await this.usersRepo.update({id}, updateUserDto);
  }
  
}
