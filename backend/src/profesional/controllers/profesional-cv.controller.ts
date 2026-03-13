import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProfesionalCvDto, CrearProfesionalCvDto, ModificarProfesionalCvDto } from '../dto/profesional-cv';
import { ProfesionalCvService } from '../services/profesional-cv.service';

@ApiTags('Profesional CV')
@ApiBearerAuth('access-token')
@Controller('profesional-cv')
export class ProfesionalCvController {
  constructor(private readonly profesionalCvService: ProfesionalCvService) { }

  @Get()
  @ApiOperation({ summary: 'Listar Profesional CVs' })
  @ApiResponse({ status: 200, type: [ProfesionalCvDto] })
  findAll(): Promise<ProfesionalCvDto[]> {
    return this.profesionalCvService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear Profesional CV' })
  @ApiResponse({ status: 201, type: ProfesionalCvDto })
  create(@Body() crearDto: CrearProfesionalCvDto): Promise<ProfesionalCvDto> {
    return this.profesionalCvService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Profesional CV por ID' })
  @ApiResponse({ status: 200, type: ProfesionalCvDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalCvDto> {
    return this.profesionalCvService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar Profesional CV' })
  @ApiResponse({ status: 200, type: ProfesionalCvDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarProfesionalCvDto): Promise<ProfesionalCvDto> {
    return this.profesionalCvService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Profesional CV' })
  @ApiResponse({ status: 200, type: ProfesionalCvDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ProfesionalCvDto> {
    return this.profesionalCvService.remove(id);
  }
}
