import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearLocalidadDto, LocalidadDto, ModificarLocalidadDto } from '../dto';
import { LocalidadService } from '../services';

@ApiTags('Localidad')
@ApiBearerAuth('access-token')
@Controller('localidad')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) { }

  @Get()
  @ApiOperation({ summary: 'Listar localidades' })
  @ApiResponse({ status: 200, type: [LocalidadDto] })
  findAll(): Promise<LocalidadDto[]> {
    return this.localidadService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear localidad' })
  @ApiResponse({ status: 201, type: LocalidadDto })
  create(@Body() crearLocalidadDto: CrearLocalidadDto): Promise<LocalidadDto> {
    return this.localidadService.create(crearLocalidadDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar localidad por ID' })
  @ApiResponse({ status: 200, type: LocalidadDto })
  findOne(@Param('id') id: number): Promise<LocalidadDto> {
    return this.localidadService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar localidad' })
  @ApiResponse({ status: 200, type: LocalidadDto })
  update(@Param('id') id: number, @Body() modificarLocalidadDto: ModificarLocalidadDto): Promise<LocalidadDto> {
    return this.localidadService.update(id, modificarLocalidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar localidad' })
  @ApiResponse({ status: 200, type: LocalidadDto })
  remove(@Param('id') id: number): Promise<LocalidadDto> {
    return this.localidadService.remove(id);
  }
}
