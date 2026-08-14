import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/entities/purchase.entity';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Purchase, Item, User])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports:[PurchaseService]
})
export class PurchaseModule {}
