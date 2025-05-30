import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { MoviesModule } from './modules/movies/movies.module';
import { StorageModule } from './modules/storage/storage.module';
import { UploadModule } from './modules/upload/upload.module';
import { MovieNotificationsService } from './modules/scheduler/movie-notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MailModule,
    MoviesModule,
    StorageModule,
    UploadModule
  ],
  controllers: [],
  providers: [MovieNotificationsService],
})
export class AppModule {}
