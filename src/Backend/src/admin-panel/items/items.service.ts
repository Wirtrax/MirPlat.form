import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepo : Repository<Item>
    ) {}

    async getAllItems(): Promise<Item[]> {
        return this.itemsRepo.find();
    }

    async updateItem(id: number, changes: Partial<Item>) {
        const result = await this.itemsRepo.update(id, changes);
        if (result.affected === 0) throw new NotFoundException('Товар не найден');
        return { success: true };
    }

    async hideItem(id: number) {
        return this.updateItem(id, {is_active: false});
    }

    async addItem(item: Item): Promise<Item> {
        return this.itemsRepo.save(item);
    }

    async deleteItem(id: number) {
        if(!await this.itemsRepo.existsBy({id})) {
            throw new NotFoundException('Товар не найден');
        }
        await this.itemsRepo.delete(id);
        return {success:true};
    }
}
