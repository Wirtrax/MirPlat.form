import { Injectable, NotFoundException } from '@nestjs/common';
import { Purchase, PurchaseStatus } from 'src/entities/purchase.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchasesRepo: Repository<Purchase>
    ) {}
        
    async getAllOrders() {
       return this.purchasesRepo
        .createQueryBuilder('purchase')
        .leftJoin('purchase.user', 'user')
        .leftJoin('purchase.item', 'item')
        .select([
            'item.name AS name',
            'COUNT(purchase.id) AS count',
            'user.id AS user_id',
            "CONCAT(user.first_name, ' ', user.last_name, ' ', user.patronym) AS full_name",
        ])
        .groupBy('item.name')
        .addGroupBy('user.id')
        .addGroupBy('full_name')
        .getRawMany();
    }
    async getPurchaseDetails(userId: number, itemId: number) {
        return this.purchasesRepo.find({
            where: {
                user: { id: userId },
                item: { id: itemId },
            },
            relations: { item: true},
            select: {
                id: true,
                status: true,
                item: { name: true}
            }
        });
    }
    
    async updateStatus(id: number, status: PurchaseStatus) {
        const result = await this.purchasesRepo.update(id, { status });
        if (result.affected === 0) throw new NotFoundException('Заказ не найден');
            return { success: true };
    }
}
