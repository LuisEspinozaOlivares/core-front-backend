import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SectorEconomicoService } from '../services';
import { CrearSectorEconomicoDto, SectorEconomicoDto, ModificarSectorEconomicoDto } from '../dto';

@ApiTags('Sectores Económicos')
@ApiBearerAuth('access-token')
@Controller('sector-economico')
export class SectorEconomicoController {
  constructor(private readonly sectorEconomicoService: SectorEconomicoService) { }

  @Get()
  @ApiOperation({ summary: 'Listar sectores económicos' })
  @ApiResponse({ status: 200, type: [SectorEconomicoDto] })
  findAll(): Promise<SectorEconomicoDto[]> {
    return this.sectorEconomicoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear sector económico' })
  @ApiResponse({ status: 201, type: SectorEconomicoDto })
  create(@Body() createSectorEconomicoDto: CrearSectorEconomicoDto): Promise<SectorEconomicoDto> {
    return this.sectorEconomicoService.create(createSectorEconomicoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener sector económico por ID' })
  @ApiResponse({ status: 200, type: SectorEconomicoDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SectorEconomicoDto> {
    return this.sectorEconomicoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar sector económico' })
  @ApiResponse({ status: 200, type: SectorEconomicoDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarSectorEconomicoDto: ModificarSectorEconomicoDto): Promise<SectorEconomicoDto> {
    return this.sectorEconomicoService.update(id, modificarSectorEconomicoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar sector económico' })
  @ApiResponse({ status: 200, type: SectorEconomicoDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<SectorEconomicoDto> {
    return this.sectorEconomicoService.remove(id);
  }
}