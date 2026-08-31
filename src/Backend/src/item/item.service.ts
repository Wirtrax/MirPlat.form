import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { MoreThan, Repository } from 'typeorm';
import { Item } from 'src/entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>
  ){}
  create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepo.create(createItemDto);
    return this.itemRepo.save(item);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepo.find();
  }

  findAllPurchasable(): Promise<Item[]>{
    return this.itemRepo.findBy({is_active: true, quantity: MoreThan(0)})
  }

  findOne(id: number) {
    return this.itemRepo.findOneBy({id});
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepo.update({id}, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepo.delete({id});
  }
}
