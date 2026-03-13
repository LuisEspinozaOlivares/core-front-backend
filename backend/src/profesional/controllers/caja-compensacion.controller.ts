import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearCajaCompensacionDto, CajaCompensacionDto, ModificarCajaCompensacionDto } from '../dto';
import { CajaCompensacionService } from '../services';

@ApiTags('Caja Compensación')
@ApiBearerAuth('access-token')
@Controller('caja-compensacion')
export class CajaCompensacionController {
  constructor(private readonly cajaCompensacionService: CajaCompensacionService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Cajas de Compensación' })
  @ApiResponse({ status: 200, type: [CajaCompensacionDto] })
  findAll(): Promise<CajaCompensacionDto[]> {
    return this.cajaCompensacionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Caja de Compensación' })
  @ApiResponse({ status: 201, type: CajaCompensacionDto })
  create(@Body() createCajaCompensacionDto: CrearCajaCompensacionDto): Promise<CajaCompensacionDto> {
    return this.cajaCompensacionService.create(createCajaCompensacionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Caja de Compensación por ID' })
  @ApiResponse({ status: 200, type: CajaCompensacionDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CajaCompensacionDto> {
    return this.cajaCompensacionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Caja de Compensación' })
  @ApiResponse({ status: 200, type: CajaCompensacionDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarCajaCompensacionDto: ModificarCajaCompensacionDto): Promise<CajaCompensacionDto> {
    return this.cajaCompensacionService.update(id, modificarCajaCompensacionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Caja de Compensación' })
  @ApiResponse({ status: 200, type: CajaCompensacionDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<CajaCompensacionDto> {
    return this.cajaCompensacionService.remove(id);
  }
}
