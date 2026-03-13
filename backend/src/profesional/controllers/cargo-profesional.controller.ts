import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CargoProfesionalService } from '../services/cargo-profesional.service';
import { CargoProfesionalDto, CrearCargoProfesionalDto, ModificarCargoProfesionalDto } from '../dto/cargo-profesional';

@ApiTags('Profesional Cargo')
@ApiBearerAuth('access-token')
@Controller('cargo-profesional')
export class CargoProfesionalController {
  constructor(private readonly service: CargoProfesionalService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos los cargos profesionales' })
  @ApiResponse({ status: 200, type: [CargoProfesionalDto] })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cargo profesional' })
  @ApiResponse({ status: 201, type: CargoProfesionalDto })
  create(@Body() dto: CrearCargoProfesionalDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cargo profesional por ID' })
  @ApiResponse({ status: 200, type: CargoProfesionalDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cargo profesional' })
  @ApiResponse({ status: 200, type: CargoProfesionalDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ModificarCargoProfesionalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cargo profesional' })
  @ApiResponse({ status: 200, type: CargoProfesionalDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
