import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadedFileEntity } from '../domain/upload.entity';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';

  constructor() {
    // check if directory is exist else create this
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath);
    }
  }

  // Handle uploaded file and return an object
  handleFile(file: Express.Multer.File): UploadedFileEntity {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    // Buid public url
    const fileUrl = `/uploads/${file.filename}`;

    // Return a complet objet
    const uploaded: UploadedFileEntity = {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      size: file.size,
      mimeType: file.mimetype,
      url: fileUrl,
      uploadedAt: new Date(),
    };

    return uploaded;
  }
}
