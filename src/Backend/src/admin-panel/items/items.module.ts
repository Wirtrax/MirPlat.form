import { Module } from '@nestjs/common';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Item } from 'src/entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]),
  MediaModule,
  ConfigModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [{
        rootPath: configService.get('IMAGES_PATH'),
        serveRoot: '/images'
      }]
    }),],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
