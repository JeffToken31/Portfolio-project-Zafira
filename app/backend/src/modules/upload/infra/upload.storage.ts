import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

const uploadPath = './uploads';

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

// Allowed format
const allowedMimeTypes = [
  // pictures
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',

  // Videos
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/mov',
  'video/quicktime',
  'video/x-msvideo', // AVI
  'video/x-matroska', // MKV
  'video/x-flv', // FLV
];

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new BadRequestException(
        `Type de fichier non autorisé : ${file.mimetype}`,
      ),
      false,
    );
  }
  callback(null, true);
}

export const multerStorage = {
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void,
    ) => {
      callback(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) => {
      const ext = extname(file.originalname);
      const uniqueName = `${randomUUID()}${ext}`;
      callback(null, uniqueName);
    },
  }),
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 Mo
  },
};
