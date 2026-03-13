import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EstadoProfesionalDto, CrearEstadoProfesionalDto, ModificarEstadoProfesionalDto } from '../dto';
import { EstadoProfesionalService } from '../services';

@ApiTags('Estado Profesional')
@ApiBearerAuth('access-token')
@Controller('estado-profesional')
export class EstadoProfesionalController {
  constructor(private readonly estadoProfesionalService: EstadoProfesionalService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Estados Profesionales' })
  @ApiResponse({ status: 200, type: [EstadoProfesionalDto] })
  findAll(): Promise<EstadoProfesionalDto[]> {
    return this.estadoProfesionalService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Estado Profesional' })
  @ApiResponse({ status: 201, type: EstadoProfesionalDto })
  create(@Body() crearDto: CrearEstadoProfesionalDto): Promise<EstadoProfesionalDto> {
    return this.estadoProfesionalService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Estado Profesional por ID' })
  @ApiResponse({ status: 200, type: EstadoProfesionalDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EstadoProfesionalDto> {
    return this.estadoProfesionalService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Estado Profesional' })
  @ApiResponse({ status: 200, type: EstadoProfesionalDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarEstadoProfesionalDto): Promise<EstadoProfesionalDto> {
    return this.estadoProfesionalService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Estado Profesional' })
  @ApiResponse({ status: 200, type: EstadoProfesionalDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<EstadoProfesionalDto> {
    return this.estadoProfesionalService.remove(id);
  }
}
