import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearPaisDto, ModificarPaisDto, PaisDto } from '../dto';
import { PaisService } from '../services';

@ApiTags('País')
@ApiBearerAuth('access-token')
@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) { }

  @Get()
  @ApiOperation({ summary: 'Listar países' })
  @ApiResponse({ status: 200, type: [PaisDto] })
  findAll(): Promise<PaisDto[]> {
    return this.paisService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear país' })
  @ApiResponse({ status: 201, type: PaisDto })
  create(@Body() crearPaisDto: CrearPaisDto): Promise<PaisDto> {
    return this.paisService.create(crearPaisDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar país por ID' })
  @ApiResponse({ status: 200, type: PaisDto })
  findOne(@Param('id') id: number): Promise<PaisDto> {
    return this.paisService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar país' })
  @ApiResponse({ status: 200, type: PaisDto })
  update(@Param('id') id: number, @Body() modificarPaisDto: ModificarPaisDto): Promise<PaisDto> {
    return this.paisService.update(id, modificarPaisDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar país' })
  @ApiResponse({ status: 200, type: PaisDto })
  remove(@Param('id') id: number): Promise<PaisDto> {
    return this.paisService.remove(id);
  }
}
