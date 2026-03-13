import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearEstadoCivilDto, EstadoCivilDto, ModificarEstadoCivilDto } from '../dto';
import { EstadoCivilService } from '../services';

@ApiTags('Estado Civil')
@ApiBearerAuth('access-token')
@Controller('estado-civil')
export class EstadoCivilController {
  constructor(private readonly estadoCivilService: EstadoCivilService) { }

  @Get()
  @ApiOperation({ summary: 'Listar estados civiles' })
  @ApiResponse({ status: 200, type: [EstadoCivilDto] })
  findAll(): Promise<EstadoCivilDto[]> {
    return this.estadoCivilService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear estado civil' })
  @ApiResponse({ status: 201, type: EstadoCivilDto })
  create(@Body() createEstadoCivilDto: CrearEstadoCivilDto): Promise<EstadoCivilDto> {
    return this.estadoCivilService.create(createEstadoCivilDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener estado civil por ID' })
  @ApiResponse({ status: 200, type: EstadoCivilDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EstadoCivilDto> {
    return this.estadoCivilService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar estado civil' })
  @ApiResponse({ status: 200, type: EstadoCivilDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarEstadoCivilDto: ModificarEstadoCivilDto): Promise<EstadoCivilDto> {
    return this.estadoCivilService.update(id, modificarEstadoCivilDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estado civil' })
  @ApiResponse({ status: 200, type: EstadoCivilDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<EstadoCivilDto> {
    return this.estadoCivilService.remove(id);
  }
}