import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearPrevisionSaludDto, PrevisionSaludDto, ModificarPrevisionSaludDto } from '../dto';
import { PrevisionSaludService } from '../services';

@ApiTags('Previsión Salud')
@ApiBearerAuth('access-token')
@Controller('prevision-salud')
export class PrevisionSaludController {
  constructor(private readonly previsionSaludService: PrevisionSaludService) { }

  @Get()
  @ApiOperation({ summary: 'Listar previsiones de salud' })
  @ApiResponse({ status: 200, type: [PrevisionSaludDto] })
  findAll(): Promise<PrevisionSaludDto[]> {
    return this.previsionSaludService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear previsión de salud' })
  @ApiResponse({ status: 201, type: PrevisionSaludDto })
  create(@Body() dto: CrearPrevisionSaludDto): Promise<PrevisionSaludDto> {
    return this.previsionSaludService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener previsión de salud por ID' })
  @ApiResponse({ status: 200, type: PrevisionSaludDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PrevisionSaludDto> {
    return this.previsionSaludService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar previsión de salud' })
  @ApiResponse({ status: 200, type: PrevisionSaludDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ModificarPrevisionSaludDto): Promise<PrevisionSaludDto> {
    return this.previsionSaludService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar previsión de salud' })
  @ApiResponse({ status: 200, type: PrevisionSaludDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<PrevisionSaludDto> {
    return this.previsionSaludService.remove(id);
  }
}
