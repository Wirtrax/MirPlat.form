import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Purchase, PurchaseStatus } from 'src/entities/purchase.entity';
import { Item } from 'src/entities/item.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
    @InjectRepository(Purchase)
    private readonly purchaseRepo: Repository<Purchase>,
    @InjectDataSource() 
    private readonly dataSource: DataSource
  ) {}

async create(itemId: number, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Пользователь не найден');

    const item = await this.itemRepo.findOneBy({ id: itemId });
    if (!item) throw new NotFoundException('Товар не найден');

    if (!item.is_active) {
        throw new ForbiddenException('Извините, данный товар недоступен для продажи');
    }

    if (item.quantity <= 0) {
        throw new ForbiddenException('Извините, данный товар уже раскуплен');
    }

    if (user.balance < item.price) {
        throw new HttpException('У Вас недостаточно средств для покупки', HttpStatus.PAYMENT_REQUIRED);
    }

    const code = randomBytes(8).toString('hex');

    return await this.dataSource.transaction(async manager => {
        await manager.decrement(User, { id: userId }, 'balance', item.price);
        await manager.decrement(Item, { id: itemId }, 'quantity', 1);
        const purchase = manager.create(Purchase, { item, user, code });
        return await manager.save(purchase);
    });
}

  findAll() {
    return this.purchaseRepo.find();
  }

  findOne(code: string) {
    return this.purchaseRepo.findOneBy({ code });
  }

  async cancel(code: string) {
    const purchase = await this.purchaseRepo.findOne({
        where: { code },
        relations: { item: true, user: true },
    });
    if (!purchase) {
        throw new NotFoundException('Покупка не найдена');
    }
    if (purchase.status !== PurchaseStatus.WAITING) {
        throw new ForbiddenException('Покупка уже завершена или отменена');
    }

    if (!purchase.user.is_admin) {
        throw new ForbiddenException('Вы не являетесь администратором');
    }

    return await this.dataSource.transaction(async manager => {
      await manager.increment(User, { id: purchase.user.id }, 'balance', purchase.item.price);
      await manager.increment(Item, { id: purchase.item.id }, 'quantity', 1);
      await manager.update(Purchase, { code }, { status: PurchaseStatus.CANCELED });
      return { success: true };
    });
}

  async receive(code: string) {
    const purchase = await this.purchaseRepo.findOneBy({ code });
    if (!purchase) {
        throw new NotFoundException('Покупка не найдена');
    }
    if (purchase.status !== PurchaseStatus.WAITING) {
        throw new ForbiddenException('Покупка уже получена или отменена');
    }
    if (!purchase.user.is_admin) {
      throw new ForbiddenException('Вы не являетесь администратором');
    }
    await this.purchaseRepo.update({ code }, { status: PurchaseStatus.RECEIVED });
    return { success: true };
}
}
