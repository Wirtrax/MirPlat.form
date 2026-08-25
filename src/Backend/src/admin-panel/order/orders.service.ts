import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Purchase, PurchaseStatus } from 'src/entities/purchase.entity';
import { Repository, DataSource } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Item } from 'src/entities/item.entity';

export interface OrderResponse {
    orderId: number;
    itemName: string;
    userFullName: string;
    userPhoneNumber: string;
    userEmail: string;
    status: PurchaseStatus;
}

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchasesRepo: Repository<Purchase>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}
        
    async getAllOrders(): Promise<OrderResponse[]> {
       /*return this.purchasesRepo
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
        .getRawMany();*/
        const allOrders = await this.purchasesRepo.find({
            relations: { item: true, user: true },
        });   

        return allOrders.map(p => ({
            orderId: p.id,
            itemName: p.item.name,
            userFullName: `${p.user.last_name} ${p.user.first_name} ${p.user.patronym ?? ''}`.trim(),
            userPhoneNumber: p.user.phone_number,
            userEmail: p.user.email,
            status: p.status
        }));

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
        const purchase = await this.purchasesRepo.findOne({
            where: { id },
            relations: { user: true, item: true }
        });
        if(!purchase) throw new NotFoundException('Покупка не найдена');

        if (purchase.status != PurchaseStatus.WAITING) {
            throw new ForbiddenException('Статус покупки уже изменен, повторное изменение невозможно');
        }
        await this.dataSource.transaction(async manager => {
        if(status===PurchaseStatus.CANCELED){
            await manager.increment(User, {id: purchase.user.id}, 'balance', purchase.item.price);
            await manager.increment(Item, {id: purchase.item.id}, 'quantity', 1);
        }
        await manager.update(Purchase, {id}, {status});
        });

        return { success: true };
    }
}
