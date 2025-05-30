import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMovieDto,
  UpdateMovieDto,
  MovieFilterDto,
} from './dtos/movie.dto';
import { MailService } from '../mail/mail.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(userId: string, dto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: {
        ...dto,
        releaseDate: new Date(dto.releaseDate),
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Se a data de lançamento for futura, agendar notificação
    const releaseDate = new Date(dto.releaseDate);
    if (releaseDate > new Date()) {
      const delay = releaseDate.getTime() - Date.now();
      setTimeout(async () => {
        await this.mailService.sendMovieReleaseNotification(
          movie.user.email,
          movie.title,
        );
      }, delay);
    }

    return movie;
  }

  async findAll(userId: string, filters: MovieFilterDto) {
    const { 
      title,
      minDuration, 
      maxDuration, 
      startDate, 
      endDate, 
      page = 1, 
      limit = 10 
    } = filters;

    const where = {
      userId,
      ...(title && { 
        title: { 
          contains: title,
          mode: 'insensitive' as Prisma.QueryMode
        } 
      }),
      ...(minDuration && { duration: { gte: minDuration } }),
      ...(maxDuration && { duration: { lte: maxDuration } }),
      ...(startDate && { 
        releaseDate: { 
          gte: new Date(startDate + 'T00:00:00.000Z') 
        } 
      }),
      ...(endDate && { 
        releaseDate: { 
          lte: new Date(endDate + 'T23:59:59.999Z') 
        } 
      }),
    };

    const [movies, total] = await Promise.all([
      this.prisma.movie.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { releaseDate: 'desc' },
      }),
      this.prisma.movie.count({ where }),
    ]);

    return {
      data: movies,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(userId: string, id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este filme',
      );
    }

    return movie;
  }

  async update(userId: string, id: string, dto: UpdateMovieDto) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este filme',
      );
    }

    return this.prisma.movie.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.releaseDate && { releaseDate: new Date(dto.releaseDate) }),
      },
    });
  }

  async remove(userId: string, id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar este filme',
      );
    }

    await this.prisma.movie.delete({
      where: { id },
    });
  }
}
