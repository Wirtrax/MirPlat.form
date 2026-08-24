import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {
}
