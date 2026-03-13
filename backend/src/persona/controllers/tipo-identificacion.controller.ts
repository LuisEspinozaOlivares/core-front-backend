import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TipoIdentificacionService } from '../services';
import { CrearTipoIdentificacionDto, ModificarTipoIdentificacionDto, TipoIdentificacionDto } from '../dto';

@ApiTags('Tipos de Identificación')
@ApiBearerAuth('access-token')
@Controller('tipo-identificacion')
export class TipoIdentificacionController {
  constructor(private readonly tipoIdentificacionService: TipoIdentificacionService) { }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de identificación' })
  @ApiResponse({ status: 200, type: [TipoIdentificacionDto] })
  findAll(): Promise<TipoIdentificacionDto[]> {
    return this.tipoIdentificacionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de identificación' })
  @ApiResponse({ status: 201, type: TipoIdentificacionDto })
  create(@Body() createTipoIdentificacionDto: CrearTipoIdentificacionDto): Promise<TipoIdentificacionDto> {
    return this.tipoIdentificacionService.create(createTipoIdentificacionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipo de identificación por ID' })
  @ApiResponse({ status: 200, type: TipoIdentificacionDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoIdentificacionDto> {
    return this.tipoIdentificacionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de identificación' })
  @ApiResponse({ status: 200, type: TipoIdentificacionDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarTipoIdentificacionDto: ModificarTipoIdentificacionDto): Promise<TipoIdentificacionDto> {
    return this.tipoIdentificacionService.update(id, modificarTipoIdentificacionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de identificación' })
  @ApiResponse({ status: 200, type: TipoIdentificacionDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<TipoIdentificacionDto> {
    return this.tipoIdentificacionService.remove(id);
  }
}
