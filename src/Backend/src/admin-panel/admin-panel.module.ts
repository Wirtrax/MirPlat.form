import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { OrderModule } from './order/orders.module';
import { AttemptsModule } from './attempts/attempts.module';
import { AuthModule } from './auth/auth.module';
import { ExcelExportModule } from './excel-export/excel-export.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        children: [UsersModule, ItemsModule, OrderModule, AttemptsModule, AuthModule, ExcelExportModule],
      },
    ]),
    UsersModule,
    ItemsModule,
    OrderModule,
    AttemptsModule,
    AuthModule,
    ExcelExportModule
  ],
})
export class AdminPanelModule {}