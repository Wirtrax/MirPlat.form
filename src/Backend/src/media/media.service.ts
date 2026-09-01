import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { rejects } from 'assert/strict';
import { access, unlink, writeFile } from 'fs';
import { join, resolve } from 'path';


@Injectable()
export class MediaService {
  constructor(private readonly configService: ConfigService) {}

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uniqueName = Date.now() + '-' + file.originalname;
    const mediaPath = this.configService.get('MEDIA_PATH');
    
    return new Promise((resolve, reject) => {
      writeFile(join(mediaPath, uniqueName), file.buffer, (err) => {
        if (err) reject(err)
        else resolve(uniqueName)
      })
    })
  }

  async deleteFile(filename: string): Promise<void> {
    const mediaPath = this.configService.get('MEDIA_PATH');
    const filePath = join(mediaPath, filename);

    return new Promise((resolve, reject) => {
      access(filePath, (err) => {
        if(err) {
          if(err.code === 'ENOENT') resolve()
          else reject(err)
          return;
        }

        unlink(filePath, (unlinkErr) => {
          if(unlinkErr) reject(unlinkErr);
          else resolve()
        });
      });
    });
  }
  
  buildImageUrl(fileName: string): string {
        const baseUrl = this.configService.get('BASE_URL');
        return `${baseUrl}/media/${fileName}`;
    }
}
