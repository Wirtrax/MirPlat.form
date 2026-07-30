import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

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
      synchronize: true, // TODO: Remove this before release to production
    }),
    AdminPanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
