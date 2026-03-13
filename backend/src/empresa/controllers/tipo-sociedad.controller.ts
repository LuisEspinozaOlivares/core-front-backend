import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearTipoSociedadDto, TipoSociedadDto, ModificarTipoSociedadDto } from '../dto';
import { TipoSociedadService } from '../services';

@ApiTags('Tipos de sociedad')
@ApiBearerAuth('access-token')
@Controller('tipo-sociedad')
export class TipoSociedadController {
  constructor(private readonly tipoSociedadService: TipoSociedadService) { }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de sociedad' })
  @ApiResponse({ status: 200, type: [TipoSociedadDto] })
  findAll(): Promise<TipoSociedadDto[]> {
    return this.tipoSociedadService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de sociedad' })
  @ApiResponse({ status: 201, type: TipoSociedadDto })
  create(@Body() createTipoSociedadDto: CrearTipoSociedadDto): Promise<TipoSociedadDto> {
    return this.tipoSociedadService.create(createTipoSociedadDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de sociedad por ID' })
  @ApiResponse({ status: 200, type: TipoSociedadDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoSociedadDto> {
    return this.tipoSociedadService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de sociedad' })
  @ApiResponse({ status: 200, type: TipoSociedadDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarTipoSociedadDto: ModificarTipoSociedadDto): Promise<TipoSociedadDto> {
    return this.tipoSociedadService.update(id, modificarTipoSociedadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de sociedad' })
  @ApiResponse({ status: 200, type: TipoSociedadDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<TipoSociedadDto> {
    return this.tipoSociedadService.remove(id);
  }
}