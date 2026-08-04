import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    private readonly purchaseRepo: Repository<Purchase>
  ) {}

  async create(itemId: number, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException('User not found');
    }

    const item = await this.itemRepo.findOneBy({ id: itemId });
    if (item === null) {
      throw new NotFoundException('Item not found');
    }

    if (!item.is_active) {
      throw new ForbiddenException('This item is not for sale');
    }

    if (item.quantity <= 0) {
      throw new ForbiddenException('Sorry, this item is sold out');
    }

    if (user.balance < item.price) {
      throw new HttpException('The user has insufficient funds.', HttpStatus.PAYMENT_REQUIRED);
    }

    const code = randomBytes(8).toString('hex');
    const purchase = this.purchaseRepo.create({ item, user, code });

    user.balance -= item.price;
    item.quantity -= 1;
    this.userRepo.save(user);
    this.itemRepo.save(item);
    return this.purchaseRepo.save(purchase);
  }

  findAll() {
    return this.purchaseRepo.find();
  }

  findOne(code: string) {
    return this.purchaseRepo.findOneBy({ code });
  }

  async cancel(code: string) {
    const purchase = await this.purchaseRepo.findOne({ where: { code }, relations: { item: true, user: true } });
    if (purchase == null) {
      throw new NotFoundException('Purchase not found');
    }
    if (purchase.status != PurchaseStatus.WAITING) {
      throw new ForbiddenException('Purchase already received or cancelled');
    }

    const user = purchase.user;
    const item = purchase.item;

    purchase.status = PurchaseStatus.CANCELED;
    user.balance += item.price;
    item.quantity += 1;
    this.itemRepo.save(item).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    this.userRepo.save(user).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    return this.purchaseRepo.save(purchase).catch((err) => {
      throw new InternalServerErrorException(err);
    });
  }

  async receive(code: string) {
    const purchase = await this.purchaseRepo.findOneBy({ code });
    if (purchase == null) {
      throw new NotFoundException('Purchase not found');
    }
    if (purchase.status != PurchaseStatus.WAITING) {
      throw new ForbiddenException('Purchase already received or cancelled');
    }

    purchase.status = PurchaseStatus.RECEIVED;
    return this.purchaseRepo.save(purchase);
  }
}
