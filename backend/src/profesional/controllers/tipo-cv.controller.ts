import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearTipoCvDto, TipoCvDto, ModificarTipoCvDto } from '../dto';
import { TipoCvService } from '../services';

@ApiTags('Tipo CV')
@ApiBearerAuth('access-token')
@Controller('tipo-cv')
export class TipoCvController {
  constructor(private readonly tipoCvService: TipoCvService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Tipos de CV' })
  @ApiResponse({ status: 200, type: [TipoCvDto] })
  findAll(): Promise<TipoCvDto[]> {
    return this.tipoCvService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Tipo de CV' })
  @ApiResponse({ status: 201, type: TipoCvDto })
  create(@Body() crearDto: CrearTipoCvDto): Promise<TipoCvDto> {
    return this.tipoCvService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Tipo de CV por ID' })
  @ApiResponse({ status: 200, type: TipoCvDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoCvDto> {
    return this.tipoCvService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Tipo de CV' })
  @ApiResponse({ status: 200, type: TipoCvDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarTipoCvDto): Promise<TipoCvDto> {
    return this.tipoCvService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Tipo de CV' })
  @ApiResponse({ status: 200, type: TipoCvDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<TipoCvDto> {
    return this.tipoCvService.remove(id);
  }
}
