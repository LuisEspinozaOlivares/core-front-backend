import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AreaAdministrativaDto, CrearAreaAdministrativaDto, ModificarAreaAdministrativaDto } from '../dto';
import { AreaAdministrativaService } from '../services';

@ApiTags('Area administrativa')
@ApiBearerAuth('access-token')
@Controller('area-administrativa')
export class AreaAdministrativaController {
  constructor(private readonly areaAdministrativaService: AreaAdministrativaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar áreas administrativas' })
  @ApiResponse({ status: 200, type: [AreaAdministrativaDto] })
  findAll(): Promise<AreaAdministrativaDto[]> {
    return this.areaAdministrativaService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear área administrativa' })
  @ApiResponse({ status: 201, type: AreaAdministrativaDto })
  create(@Body() crearAreaAdministrativaDto: CrearAreaAdministrativaDto): Promise<AreaAdministrativaDto> {
    return this.areaAdministrativaService.create(crearAreaAdministrativaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar área administrativa por ID' })
  @ApiResponse({ status: 200, type: AreaAdministrativaDto })
  findOne(@Param('id') id: number): Promise<AreaAdministrativaDto> {
    return this.areaAdministrativaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar área administrativa' })
  @ApiResponse({ status: 200, type: AreaAdministrativaDto })
  update(@Param('id') id: number, @Body() modificarAreaAdministrativaDto: ModificarAreaAdministrativaDto): Promise<AreaAdministrativaDto> {
    return this.areaAdministrativaService.update(id, modificarAreaAdministrativaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar área administrativa' })
  @ApiResponse({ status: 200, type: AreaAdministrativaDto })
  remove(@Param('id') id: number): Promise<AreaAdministrativaDto> {
    return this.areaAdministrativaService.remove(id);
  }
}
