import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProfesionalAreaDto, CrearProfesionalAreaDto, ModificarProfesionalAreaDto } from '../dto/profesional-area';
import { ProfesionalAreaService } from '../services/profesional-area.service';

@ApiTags('Profesional Area')
@ApiBearerAuth('access-token')
@Controller('profesional-area')
export class ProfesionalAreaController {
  constructor(private readonly service: ProfesionalAreaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar áreas profesionales' })
  @ApiResponse({ status: 200, type: [ProfesionalAreaDto] })
  findAll(): Promise<ProfesionalAreaDto[]> {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear área profesional' })
  @ApiResponse({ status: 201, type: ProfesionalAreaDto })
  create(@Body() dto: CrearProfesionalAreaDto): Promise<ProfesionalAreaDto> {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener área profesional por ID' })
  @ApiResponse({ status: 200, type: ProfesionalAreaDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalAreaDto> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar área profesional' })
  @ApiResponse({ status: 200, type: ProfesionalAreaDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ModificarProfesionalAreaDto): Promise<ProfesionalAreaDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar área profesional' })
  @ApiResponse({ status: 200, type: ProfesionalAreaDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalAreaDto> {
    return this.service.remove(id);
  }
}
