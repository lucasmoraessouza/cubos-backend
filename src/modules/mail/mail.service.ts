import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendMovieReleaseNotification(userEmail: string, movieTitle: string) {
    try {
      const response = await this.resend.emails.send({
        from: 'Plataforma de Filmes <filmes@resend.dev>',
        to: [userEmail],
        subject: `O filme ${movieTitle} foi lançado!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #333;">Filme Lançado!</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              O filme "${movieTitle}" que você cadastrou em nossa plataforma foi lançado hoje!
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Não perca a chance de assistir a este filme que você estava aguardando.
            </p>
          </div>
        `,
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }
  }
} 