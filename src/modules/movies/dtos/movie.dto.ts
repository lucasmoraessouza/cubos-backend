import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, IsOptional, IsNumber, IsEnum, IsArray, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export enum Genre {
  ACAO = 'ACAO',
  AVENTURA = 'AVENTURA',
  COMEDIA = 'COMEDIA',
  DRAMA = 'DRAMA',
  TERROR = 'TERROR',
  FICCAO_CIENTIFICA = 'FICCAO_CIENTIFICA'
}

export enum OriginalLanguage {
  EN = 'en',
  PT = 'pt',
  ES = 'es',
  FR = 'fr'
}

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  portugueseTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  popularity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  voteCount: number;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsString()
  releaseDate: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  budget: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  revenue: number;

  @ApiProperty()
  @IsString()
  originalLanguage: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(Genre, { each: true })
  genres: Genre[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsUrl()
  trailerUrl?: string;
}

export class UpdateMovieDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  originalTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  portugueseTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  synopsis?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  popularity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  voteCount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  releaseDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  revenue?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(OriginalLanguage)
  originalLanguage?: OriginalLanguage;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsEnum(Genre, { each: true })
  genres?: Genre[];

  image?: Express.Multer.File;
}

export class MovieFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minDuration?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @IsOptional()
  @IsEnum(OriginalLanguage)
  originalLanguage?: OriginalLanguage;
} 