import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService implements OnModuleInit {
  private s3Client: S3Client;
  private bucket: string;

  onModuleInit() {
    if (
      !process.env.AWS_BUCKET_NAME ||
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY
    ) {
      throw new Error('AWS credentials not properly configured');
    }

    this.bucket = process.env.AWS_BUCKET_NAME;
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      requestHandler: {
        timeout: 5000,
      },
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const key = `movies/${Date.now()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      await this.s3Client.send(command);

      const imageUrl = `https://${this.bucket}.s3.amazonaws.com/${key}`;
      console.log('Upload successful:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Erro no upload:', {
        message: error.message,
        code: error.code,
        bucket: this.bucket,
        region: process.env.AWS_REGION,
      });
      throw new Error(`Erro no upload: ${error.message}`);
    }
  }

  async generatePresignedUrl(key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
