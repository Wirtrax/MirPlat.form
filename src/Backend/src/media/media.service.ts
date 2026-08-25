import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { join } from 'path';


@Injectable()
export class MediaService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const uniqueName = Date.now() + '-' + file.originalname;
    return new Promise((resolve, reject) => {
      writeFile(join(__dirname, '..', '..', 'media', uniqueName), file.buffer, (err) => {
        if (err) reject(err)
        else resolve(uniqueName)
      })
    })
  }
}
