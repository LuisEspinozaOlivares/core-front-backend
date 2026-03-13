import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UbicacionEmpresaService } from '../services';
import { CrearUbicacionEmpresaDto, UbicacionEmpresaDto, ModificarUbicacionEmpresaDto } from '../dto';

@ApiTags('Ubicacion Empresa')
@ApiBearerAuth('access-token')
@Controller('ubicacion-empresa')
export class UbicacionEmpresaController {
  constructor(private readonly ubicacionEmpresaService: UbicacionEmpresaService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ubicaciones de empresa' })
  @ApiResponse({ status: 200, description: 'Lista de ubicaciones obtenida.', type: [UbicacionEmpresaDto] })
  findAll() {
    return this.ubicacionEmpresaService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ubicación de empresa' })
  @ApiResponse({ status: 201, description: 'Ubicación creada exitosamente.', type: UbicacionEmpresaDto })
  create(@Body() crearDto: CrearUbicacionEmpresaDto) {
    return this.ubicacionEmpresaService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ubicación por ID' })
  @ApiResponse({ status: 200, description: 'Ubicación encontrada.', type: UbicacionEmpresaDto })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionEmpresaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una ubicación por ID' })
  @ApiResponse({ status: 200, description: 'Ubicación actualizada exitosamente.', type: UbicacionEmpresaDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarUbicacionEmpresaDto) {
    return this.ubicacionEmpresaService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ubicación por ID' })
  @ApiResponse({ status: 200, description: 'Ubicación eliminada exitosamente.', type: UbicacionEmpresaDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionEmpresaService.remove(id);
  }
}
