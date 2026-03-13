import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoDireccionService } from '../services';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrearTipoDireccionDto, ModificarTipoDireccionDto, TipoDireccionDto } from '../dto';

@ApiTags('Tipos de Direccion')
@ApiBearerAuth('access-token')
@Controller('tipo-direccion')
export class TipoDireccionController {
  constructor(private readonly tipoDireccionService: TipoDireccionService) { }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de dirección' })
  @ApiResponse({ status: 200, type: [TipoDireccionDto] })
  findAll(): Promise<TipoDireccionDto[]> {
    return this.tipoDireccionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de dirección' })
  @ApiResponse({ status: 201, type: TipoDireccionDto })
  create(@Body() crearTipoDireccionDto: CrearTipoDireccionDto): Promise<TipoDireccionDto> {
    return this.tipoDireccionService.create(crearTipoDireccionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de dirección por ID' })
  @ApiResponse({ status: 200, type: TipoDireccionDto })
  findOne(@Param('id') id: number): Promise<TipoDireccionDto> {
    return this.tipoDireccionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de dirección' })
  @ApiResponse({ status: 200, type: TipoDireccionDto })
  update(@Param('id') id: number, @Body() modificarTipoDireccionDto: ModificarTipoDireccionDto): Promise<TipoDireccionDto> {
    return this.tipoDireccionService.update(id, modificarTipoDireccionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de dirección' })
  @ApiResponse({ status: 200, type: TipoDireccionDto })
  remove(@Param('id') id: number): Promise<TipoDireccionDto> {
    return this.tipoDireccionService.remove(id);
  }
}