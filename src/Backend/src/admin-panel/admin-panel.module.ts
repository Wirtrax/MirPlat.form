import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [UsersModule, ItemsModule],
      },
    ]),
    ItemsModule,
  ],
})
export class AdminPanelModule {}