import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearAfpDto, AfpDto, ModificarAfpDto } from '../dto';
import { AfpService } from '../services';

@ApiTags('AFP')
@ApiBearerAuth('access-token')
@Controller('afp')
export class AfpController {
  constructor(private readonly afpService: AfpService) { }

  @Get()
  @ApiOperation({ summary: 'Listar AFPs' })
  @ApiResponse({ status: 200, type: [AfpDto] })
  findAll(): Promise<AfpDto[]> {
    return this.afpService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear AFP' })
  @ApiResponse({ status: 201, type: AfpDto })
  create(@Body() createAfpDto: CrearAfpDto): Promise<AfpDto> {
    return this.afpService.create(createAfpDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener AFP por ID' })
  @ApiResponse({ status: 200, type: AfpDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AfpDto> {
    return this.afpService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar AFP' })
  @ApiResponse({ status: 200, type: AfpDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarAfpDto: ModificarAfpDto): Promise<AfpDto> {
    return this.afpService.update(id, modificarAfpDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar AFP' })
  @ApiResponse({ status: 200, type: AfpDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<AfpDto> {
    return this.afpService.remove(id);
  }
}
