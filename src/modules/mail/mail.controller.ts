import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test')
  async testEmail(@Body() body: { email: string }) {
    return await this.mailService.sendMovieReleaseNotification(
      body.email,
      'Filme Teste',
    );
  }
} 