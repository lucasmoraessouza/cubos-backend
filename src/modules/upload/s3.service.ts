import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME') ?? '';
    
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION') ?? '',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
      },
    });
  }

  async upload(fileBuffer: Buffer, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: 'image/jpeg', 
    });

    await this.s3Client.send(command);

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }
} 