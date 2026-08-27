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
export interface OrderWithItemId extends OrderResponse {
    itemId: number;
}

export interface OrderResponseByUserId {
    orderId: number;
    userId: number;
    itemName: string;
    itemImage: string;
    itemPrice: number;
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
            relations: { item: true, user: true }   
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
    async getOrder(orderId: number): Promise<OrderResponse> {
        const order = await this.purchasesRepo.findOne({
            where: { id: orderId },
            relations: { item: true, user: true },
        });
        if(!order) {
            throw new NotFoundException('Покупка не найдена');
        }
        return {
            orderId: order.id,
            itemName: order.item.name,
            userFullName: `${order.user.last_name} ${order.user.first_name} ${order.user.patronym ?? ''}`.trim(),
            userPhoneNumber: order.user.phone_number,
            userEmail: order.user.email,
            status: order.status
        }
    }

    async getOrderByCode(orderCode: string): Promise<OrderWithItemId> {
        const orderByCode = await this.purchasesRepo.findOne({
            where: { code: orderCode}, 
            relations: { item: true, user: true }})
        if(!orderByCode) {
            throw new NotFoundException('Заказов по этому коду не найдено');
        }

        return {
            orderId: orderByCode.id,
            itemId: orderByCode.item.id,
            itemName: orderByCode.item.name,
            userFullName: `${orderByCode.user.last_name} ${orderByCode.user.first_name} ${orderByCode.user.patronym ?? ''}`.trim(),
            userPhoneNumber: orderByCode.user.phone_number,
            userEmail: orderByCode.user.email,
            status: orderByCode.status
        }
    }

    async getOrdersByItemId(itemId: number) {
        const ordersByItemId = await this.purchasesRepo.find({
            where: {
                item: {id: itemId}
            },
            relations: { item: true, user: true },
        })
        if(ordersByItemId.length === 0) {
            throw new NotFoundException('Заказов по этому товару не найдено');
        }

        return ordersByItemId.map(p => ({
            orderId: p.id,
            itemName: p.item.name,
            userFullName: `${p.user.last_name} ${p.user.first_name} ${p.user.patronym ?? ''}`.trim(),
            userPhoneNumber: p.user.phone_number,
            userEmail: p.user.email,
            status: p.status
        }))
    }

    async getOrdersByUserId(userId: number): Promise<OrderResponseByUserId[]> {
        const ordersByUserId = await this.purchasesRepo.find({
            where: {
                user: {id: userId}
            },
            relations: { item: true, user: true },
        })
        if(ordersByUserId.length === 0) {
            throw new NotFoundException('Заказов по данному пользователю не найдено');
        }

        return ordersByUserId.map(o => ({
            orderId: o.id,
            userId: o.user.id,
            itemName: o.item.name,
            itemImage: o.item.image,
            itemPrice: o.item.price
        }))
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
        const order = await this.purchasesRepo.findOne({
            where: { id },
            relations: { user: true, item: true }
        });
        if(!order) throw new NotFoundException('Покупка не найдена');

        if (order.status != PurchaseStatus.WAITING) {
            throw new ForbiddenException('Статус покупки уже изменен, повторное изменение невозможно');
        }
        await this.dataSource.transaction(async manager => {
        if(status===PurchaseStatus.CANCELED){
            await manager.increment(User, {id: order.user.id}, 'balance', order.item.price);
            await manager.increment(Item, {id: order.item.id}, 'quantity', 1);
        }
        await manager.update(Purchase, {id}, {status});
        });

        return { success: true };
    }
}
