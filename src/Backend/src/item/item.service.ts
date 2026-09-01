import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { MoreThan, Repository } from 'typeorm';
import { Item } from 'src/entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    private readonly mediaService: MediaService
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

  async findOne(id: number) {
    const item = await this.itemRepo.findOneBy({id});
    if(!item) {
      throw new NotFoundException('Товар не найден');
    }
    return {
      ...item,
      image: item.image ? this.mediaService.buildImageUrl(item.image) : null,
    };
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepo.update({id}, updateItemDto);
  }

  remove(id: number) {
    return this.itemRepo.delete({id});
  }
}
