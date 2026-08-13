import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Purchase, PurchaseStatus } from 'src/entities/purchase.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { User } from 'src/entities/user.entity';
import { Item } from 'src/entities/item.entity';
import { DataSource } from 'typeorm/browser/data-source/DataSource.js';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchasesRepo: Repository<Purchase>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(Item)
        private readonly itemsRepo: Repository<Item>,
        
        @InjectDataSource()
        private readonly dataSource: DataSource
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
        const purchase = await this.purchasesRepo.findOne({
            where: { id },
            relations: { user: true, item: true }
        });
        if(!purchase) throw new NotFoundException('Покупка не найдена');

        if (purchase.status != PurchaseStatus.WAITING) {
            throw new ForbiddenException('Статус покупки уже изменен, повторное изменение невозможно');
        }

        if(status===PurchaseStatus.CANCELED){
            const user = await this.usersRepo.findOne({ where: { id: purchase.user.id } });
            if(!user) {
                throw new NotFoundException('Пользователь не найден');
            }
            const item = await this.itemsRepo.findOne({ where: { id: purchase.item.id } });
            if(!item) {
                throw new NotFoundException('Товар не найден');
            }

            await this.dataSource.transaction(async manager => {
                await manager.increment(User, {id: purchase.user.id}, 'balance', item.price);
                await manager.increment(Item, {id: purchase.item.id}, 'quantity', 1);
                await manager.update(Purchase, {id}, {status});
            })
        }
        else {
            await this.purchasesRepo.update(id, {status});
        }

        return { success: true };
    }
}
