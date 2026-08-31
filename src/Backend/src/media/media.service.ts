import { Injectable } from '@nestjs/common';
import { rejects } from 'assert/strict';
import { access, unlink, writeFile } from 'fs';
import { join, resolve } from 'path';


@Injectable()
export class MediaService {
  private readonly mediaPath = join(__dirname, '..', '..', 'media');

  async saveFile(file: Express.Multer.File): Promise<string> {
    const uniqueName = Date.now() + '-' + file.originalname;
    const filePath = join(this.mediaPath, uniqueName);
    
    return new Promise((resolve, reject) => {
      writeFile(filePath, file.buffer, (err) => {
        if (err) reject(err)
        else resolve(uniqueName)
      })
    })
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(this.mediaPath, filename);

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
}
