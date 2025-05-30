import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendMovieReleaseNotification(
    to: string,
    movieTitle: string,
    releaseDate: Date,
  ) {
    try {
      const response = await this.resend.emails.send({
        from: 'Cubos Movies <onboarding@resend.dev>',
        to: [to],
        subject: `Novo lançamento: ${movieTitle}`,
        html: `
          <h1>Novo filme disponível!</h1>
          <p>O filme "${movieTitle}" acabou de ser lançado em nossa plataforma.</p>
          <p>Data de lançamento: ${releaseDate.toLocaleDateString()}</p>
          <p>Não perca essa estreia!</p>
        `,
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }
  }
} 