import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto, MovieFilterDto } from './dtos/movie.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Filmes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo filme' })
  @ApiResponse({ status: 201, description: 'Filme criado com sucesso' })
  create(@Request() req, @Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(req.user.id, createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar filmes com paginação e filtros' })
  @ApiResponse({ status: 200, description: 'Lista de filmes retornada com sucesso' })
  findAll(@Request() req, @Query() filters: MovieFilterDto) {
    return this.moviesService.findAll(req.user.id, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar filme por ID' })
  @ApiResponse({ status: 200, description: 'Filme encontrado' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.moviesService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar filme' })
  @ApiResponse({ status: 200, description: 'Filme atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(req.user.id, id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover filme' })
  @ApiResponse({ status: 200, description: 'Filme removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Filme não encontrado' })
  remove(@Request() req, @Param('id') id: string) {
    return this.moviesService.remove(req.user.id, id);
  }
} 