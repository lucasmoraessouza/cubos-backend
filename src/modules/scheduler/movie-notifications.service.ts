import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MovieNotificationsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkAndNotifyMovieReleases() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const moviesToRelease = await this.prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const users = await this.prisma.user.findMany();

    for (const movie of moviesToRelease) {
      for (const user of users) {
        await this.mailService.sendMovieReleaseNotification(
          user.email,
          movie.originalTitle,
          movie.imageUrl || '',
        );
      }
    }
  }
}
