import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearGeneroDto, GeneroDto, ModificarGeneroDto } from '../dto';
import { GeneroService } from '../services';

@ApiTags('Género')
@ApiBearerAuth('access-token')
@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) { }

  @Get()
  @ApiOperation({ summary: 'Listar géneros' })
  @ApiResponse({ status: 200, type: [GeneroDto] })
  findAll(): Promise<GeneroDto[]> {
    return this.generoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear género' })
  @ApiResponse({ status: 201, type: GeneroDto })
  create(@Body() createGeneroDto: CrearGeneroDto): Promise<GeneroDto> {
    return this.generoService.create(createGeneroDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener género por ID' })
  @ApiResponse({ status: 200, type: GeneroDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<GeneroDto> {
    return this.generoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar género' })
  @ApiResponse({ status: 200, type: GeneroDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarGeneroDto: ModificarGeneroDto): Promise<GeneroDto> {
    return this.generoService.update(id, modificarGeneroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar género' })
  @ApiResponse({ status: 200, type: GeneroDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<GeneroDto> {
    return this.generoService.remove(id);
  }
}