import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [UsersModule],
      },
    ]),
  ],
})
export class AdminPanelModule {}