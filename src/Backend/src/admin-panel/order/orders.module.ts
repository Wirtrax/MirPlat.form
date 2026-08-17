import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/entities/purchase.entity';
import { User } from 'src/entities/user.entity';
import { Item } from 'src/entities/item.entity'


@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User, Item])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
