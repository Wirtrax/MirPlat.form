import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
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
    
  ){}
  async create(itemId: number, userId: number) {
    const user = await this.userRepo.findOneBy({id: userId});
    if (user === null){
      throw new NotFoundException("User not found")
    }
    
    const item = await this.itemRepo.findOneBy({id: itemId});
    if (item === null){
      throw new NotFoundException("Item not found");
    }

    if (!item.is_active){
      throw new ForbiddenException("This item is not for sale");
    }

    if (item.quantity <= 0){
      throw new ForbiddenException("Sorry, this item is sold out");
    }

    if (user.balance < item.price){
      throw new HttpException('The user has insufficient funds.', HttpStatus.PAYMENT_REQUIRED);
    }

    const code = randomBytes(8).toString('hex');
    const purchase = this.purchaseRepo.create({item, user, code})

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
    return this.purchaseRepo.findOneBy({code})
  }

  async cancel(code: string) {
    const purchase = await this.purchaseRepo.findOneBy({code});
    if (purchase == null){
      throw new NotFoundException("Purchase not found");
    }
    if (purchase.status != PurchaseStatus.WAITING){
      throw new ForbiddenException("Purchase already received or cancelled");
    }

    const user = purchase.user;
    
    purchase.status = PurchaseStatus.CANCELED;  
    user.balance += purchase.item.price;

    this.userRepo.save(user);
    return this.purchaseRepo.save(purchase);
  }

  async receive(code: string) {
    const purchase = await this.purchaseRepo.findOneBy({code});
    if (purchase == null){
      throw new NotFoundException("Purchase not found");
    }
    if (purchase.status != PurchaseStatus.WAITING){
      throw new ForbiddenException("Purchase already received or cancelled");
    }

    purchase.status = PurchaseStatus.RECEIVED;
    return this.purchaseRepo.save(purchase);  
  }
}
