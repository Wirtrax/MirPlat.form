import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { OrderModule } from './order/orders.module';
import { AttemptsModule } from './attempts/attempts.module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [UsersModule, ItemsModule, OrderModule, AttemptsModule],
      },
    ]),
    ItemsModule,
    OrderModule,
    AttemptsModule,
  ],
})
export class AdminPanelModule {}