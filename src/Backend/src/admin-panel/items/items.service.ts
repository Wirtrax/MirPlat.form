import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir } from 'fs/promises';
import { Item } from 'src/entities/item.entity';
import { Repository, ILike } from 'typeorm';
import { UpdateItemDto } from './itemDto/updateItemDto';
import { CreateItemDto } from './itemDto/createItemDto';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepo: Repository<Item>,
        private readonly configService: ConfigService,
        private readonly mediaService: MediaService,
    ) {}

    async getAllItems() {
        const items = await this.itemsRepo.find();
        return items.map(item => ({
            ...item,
            image: item.image ? this.mediaService.buildImageUrl(item.image) : null,
        }));
    }

    async updateItem(id: number, updateItemDto: Partial<UpdateItemDto>, image?: Express.Multer.File) {
        const item = await this.itemsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException('Товар не найден');
        }

        const updateData: any = { ...updateItemDto };
        if (image) {
            const fileName = await this.mediaService.saveFile(image);
            updateData.image = fileName;
        }

        await this.itemsRepo.update(id, updateData);
        return { success: true };
    }

    async changeStatusItem(id: number, status: boolean) {
        return this.updateItem(id, { is_active: status });
    }

    async addItem(createItemDto: CreateItemDto, image: Express.Multer.File): Promise<Item> {
        const fileName = await this.mediaService.saveFile(image);
        const item = this.itemsRepo.create({
            ...createItemDto,
            image: fileName,
        });
        return this.itemsRepo.save(item);
    }

    async deleteItem(id: number) {
        if (!await this.itemsRepo.existsBy({ id })) {
            throw new NotFoundException('Товар не найден');
        }
        await this.itemsRepo.delete(id);
        return { success: true };
    }

    async getImages(): Promise<string[]> {
        const imagesPath = this.configService.get('IMAGES_PATH');
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        if (!imagesPath) {
            throw new Error('Путь с изображениями не задан в конфигурации');
        }
        try {
            const images = (await readdir(imagesPath))
                .filter(file => allowedExtensions.some(ext => file.toLowerCase().endsWith(ext)));
            return images;
        } catch {
            throw new NotFoundException('Изображения не найдены');
        }
    }

    async searchItemsByName(query: string) {
        const items = await this.itemsRepo.find({
            where: {
                name: ILike(`%${query}%`),
            },
        });
        return items.map(item => ({
            ...item,
            image: item.image ? this.mediaService.buildImageUrl(item.image) : null,
        }));
    }
}