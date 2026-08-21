import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { ExcelExportModule } from './admin-panel/excel-export/excel-export.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: parseInt(process.env.DBPORT as string),
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],//в маске добавил .js
      autoLoadEntities: true,
      logging:['query','error'],
      synchronize: true, // TODO: Remove this before release to production
    }),
    UserModule,
    ItemModule,
    AuthModule,
    AdminPanelModule,
    ExcelExportModule,
    ActivitiesModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
