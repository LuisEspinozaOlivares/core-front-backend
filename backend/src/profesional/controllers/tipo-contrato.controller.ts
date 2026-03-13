import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearTipoContratoDto, TipoContratoDto, ModificarTipoContratoDto } from '../dto';
import { TipoContratoService } from '../services';

@ApiTags('Tipo Contrato')
@ApiBearerAuth('access-token')
@Controller('tipo-contrato')
export class TipoContratoController {
  constructor(private readonly tipoContratoService: TipoContratoService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Tipos de Contrato' })
  @ApiResponse({ status: 200, type: [TipoContratoDto] })
  findAll(): Promise<TipoContratoDto[]> {
    return this.tipoContratoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Tipo de Contrato' })
  @ApiResponse({ status: 201, type: TipoContratoDto })
  create(@Body() crearDto: CrearTipoContratoDto): Promise<TipoContratoDto> {
    return this.tipoContratoService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Tipo de Contrato por ID' })
  @ApiResponse({ status: 200, type: TipoContratoDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoContratoDto> {
    return this.tipoContratoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Tipo de Contrato' })
  @ApiResponse({ status: 200, type: TipoContratoDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarTipoContratoDto): Promise<TipoContratoDto> {
    return this.tipoContratoService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Tipo de Contrato' })
  @ApiResponse({ status: 200, type: TipoContratoDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<TipoContratoDto> {
    return this.tipoContratoService.remove(id);
  }
}
