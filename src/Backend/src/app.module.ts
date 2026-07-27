import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT as string),
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        entities: [__dirname + '/entities/*.entity.ts'],
        synchronize: true, // TODO: Remove this before release to production
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
