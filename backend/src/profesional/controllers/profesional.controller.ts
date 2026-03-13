import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearProfesionalDto, ModificarProfesionalDto, ProfesionalDto } from '../dto';
import { ProfesionalService } from '../services';
import { PaginationRequestDto, PaginationResponseDto } from '../../common/dto';

@ApiTags('Profesional')
@ApiBearerAuth('access-token')
@Controller('profesional')
export class ProfesionalController {
  constructor(private readonly profesionalService: ProfesionalService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos los profesionales activos' })
  @ApiResponse({ status: 200, type: PaginationResponseDto<ProfesionalDto> })
  findAll(@Query() paginationRequestDto: PaginationRequestDto): Promise<PaginationResponseDto<ProfesionalDto>> {
    return this.profesionalService.findAll(paginationRequestDto);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo profesional' })
  @ApiResponse({ status: 201, type: ProfesionalDto })
  create(@Body() crearProfessionalDto: CrearProfesionalDto): Promise<ProfesionalDto> {
    return this.profesionalService.create(crearProfessionalDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un profesional por ID' })
  @ApiResponse({ status: 200, type: ProfesionalDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalDto> {
    return this.profesionalService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un profesional' })
  @ApiResponse({ status: 200, type: ProfesionalDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarProfesionalDto: ModificarProfesionalDto): Promise<ProfesionalDto> {
    return this.profesionalService.update(id, modificarProfesionalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un profesional' })
  @ApiResponse({ status: 200, type: ProfesionalDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalDto> {
    return this.profesionalService.remove(id);
  }
}
