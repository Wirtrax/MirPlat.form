import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { PurchaseService } from 'src/purchase/purchase.service';
import { Purchase } from 'src/entities/purchase.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item,User,Purchase])],
  controllers: [ItemController],
  providers: [ItemService, PurchaseService],
})
export class ItemModule {}
