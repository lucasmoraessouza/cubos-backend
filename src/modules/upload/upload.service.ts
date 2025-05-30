import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Service } from './s3.service';

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      this.validateFileType(file);

      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const fileExtension = file.originalname.split('.').pop();
      const key = `movies/${fileName}.${fileExtension}`;

      const url = await this.s3Service.upload(file.buffer, key);

      return { url };
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new BadRequestException('Erro ao fazer upload do arquivo');
    }
  }

  private validateFileType(file: Express.Multer.File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não permitido');
    }
  }
} 