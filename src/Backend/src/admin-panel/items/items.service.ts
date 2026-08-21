import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir } from 'fs/promises';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { UpdateItemDto } from './itemDto/updateItemDto';
import { CreateItemDto } from './itemDto/createItemDto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepo : Repository<Item>,
        private readonly configService: ConfigService
    ) {}

    async getAllItems(): Promise<Item[]> {
        return this.itemsRepo.find();
    }

    async updateItem(id: number, updateItemDto: Partial<UpdateItemDto>) {
        const result = await this.itemsRepo.update(id, updateItemDto);
        if (result.affected === 0) throw new NotFoundException('Товар не найден');
        return { success: true };
    }

    async hideItem(id: number) {
        return this.updateItem(id, {is_active: false});
    }

    async addItem(createItemDto: CreateItemDto): Promise<CreateItemDto> {
        return this.itemsRepo.save(createItemDto);
    }

    async deleteItem(id: number) {
        if(!await this.itemsRepo.existsBy({id})) {
            throw new NotFoundException('Товар не найден');
        }
        await this.itemsRepo.delete(id);
        return {success:true};
    }

    async getImages(): Promise<string[]> {
        const imagesPath = this.configService.get('IMAGES_PATH');
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        if(!imagesPath) {
            throw new Error('Путь с изображениями не задан в конфигурации');
        }
        try {
            const images = (await readdir(imagesPath))
                .filter(file => allowedExtensions.some(ext => file.toLowerCase().endsWith(ext)));
            
            return images;
        }
        catch {
            throw new NotFoundException('Изображения не найдены');
        }
    
    }
}
