import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearGiroActividadDto, GiroActividadDto, ModificarGiroActividadDto } from '../dto';
import { GiroActividadService } from '../services';

@ApiTags('Giros de Actividad')
@ApiBearerAuth('access-token')
@Controller('giro-actividad')
export class GiroActividadController {
  constructor(private readonly giroActividadService: GiroActividadService) { }

  @Get()
  @ApiOperation({ summary: 'Listar giros de actividad' })
  @ApiResponse({ status: 200, type: [GiroActividadDto] })
  findAll(): Promise<GiroActividadDto[]> {
    return this.giroActividadService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear giro de actividad' })
  @ApiResponse({ status: 201, type: GiroActividadDto })
  create(@Body() createGiroActividadDto: CrearGiroActividadDto): Promise<GiroActividadDto> {
    return this.giroActividadService.create(createGiroActividadDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener giro de actividad por ID' })
  @ApiResponse({ status: 200, type: GiroActividadDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GiroActividadDto> {
    return this.giroActividadService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar giro de actividad' })
  @ApiResponse({ status: 200, type: GiroActividadDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarGiroActividadDto: ModificarGiroActividadDto): Promise<GiroActividadDto> {
    return this.giroActividadService.update(id, modificarGiroActividadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar giro de actividad' })
  @ApiResponse({ status: 200, type: GiroActividadDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<GiroActividadDto> {
    return this.giroActividadService.remove(id);
  }
}