import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NacionalidadService } from '../services';
import { CrearNacionalidadDto, ModificarNacionalidadDto, NacionalidadDto } from '../dto';

@ApiTags('Nacionalidad')
@ApiBearerAuth('access-token')
@Controller('nacionalidad')
export class NacionalidadController {
  constructor(private readonly nacionalidadService: NacionalidadService) { }

  @Get()
  @ApiOperation({ summary: 'Listar nacionalidades' })
  @ApiResponse({ status: 200, type: [NacionalidadDto] })
  findAll(): Promise<NacionalidadDto[]> {
    return this.nacionalidadService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear nacionalidad' })
  @ApiResponse({ status: 201, type: NacionalidadDto })
  create(@Body() createNacionalidadDto: CrearNacionalidadDto): Promise<NacionalidadDto> {
    return this.nacionalidadService.create(createNacionalidadDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener nacionalidad por ID' })
  @ApiResponse({ status: 200, type: NacionalidadDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NacionalidadDto> {
    return this.nacionalidadService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar nacionalidad' })
  @ApiResponse({ status: 200, type: NacionalidadDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarNacionalidadDto: ModificarNacionalidadDto): Promise<NacionalidadDto> {
    return this.nacionalidadService.update(id, modificarNacionalidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar nacionalidad' })
  @ApiResponse({ status: 200, type: NacionalidadDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<NacionalidadDto> {
    return this.nacionalidadService.remove(id);
  }
}
