import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TipoContactoService } from '../services';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrearTipoContactoDto, ModificarTipoContactoDto, TipoContactoDto } from '../dto';

@ApiTags('Tipos de Contacto')
@ApiBearerAuth('access-token')
@Controller('tipo-contacto')
export class TipoContactoController {
  constructor(private readonly tipoContactoService: TipoContactoService) { }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de contacto' })
  @ApiResponse({ status: 200, type: [TipoContactoDto] })
  findAll(): Promise<TipoContactoDto[]> {
    return this.tipoContactoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de contacto' })
  @ApiResponse({ status: 201, type: TipoContactoDto })
  create(@Body() crearTipoContactoDto: CrearTipoContactoDto): Promise<TipoContactoDto> {
    return this.tipoContactoService.create(crearTipoContactoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de contacto por ID' })
  @ApiResponse({ status: 200, type: TipoContactoDto })
  findOne(@Param('id') id: number): Promise<TipoContactoDto> {
    return this.tipoContactoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar tipo de contacto' })
  @ApiResponse({ status: 200, type: TipoContactoDto })
  update(@Param('id') id: number, @Body() modificarTipoContactoDto: ModificarTipoContactoDto): Promise<TipoContactoDto> {
    return this.tipoContactoService.update(id, modificarTipoContactoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tipo de contacto' })
  @ApiResponse({ status: 200, type: TipoContactoDto })
  remove(@Param('id') id: number): Promise<TipoContactoDto> {
    return this.tipoContactoService.remove(id);
  }
}