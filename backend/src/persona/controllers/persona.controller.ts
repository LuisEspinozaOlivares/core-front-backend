import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearPersonaDto, PersonaDto, ModificarPersonaDto } from '../dto';
import { PersonaService } from '../services';
import { PaginationRequestDto, PaginationResponseDto } from '../../common/dto';

@ApiTags('Persona')
@ApiBearerAuth('access-token')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personService: PersonaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar personas activas' })
  @ApiResponse({ status: 200, type: PaginationResponseDto<PersonaDto> })
  findAll(@Query() paginationRequestDto: PaginationRequestDto): Promise<PaginationResponseDto<PersonaDto>> {
    return this.personService.findAll(paginationRequestDto);
  }

  @Post()
  @ApiOperation({ summary: 'Crear persona' })
  @ApiResponse({ status: 201, type: PersonaDto })
  create(@Body() createPersonDto: CrearPersonaDto): Promise<PersonaDto> {
    return this.personService.create(createPersonDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener persona por ID' })
  @ApiResponse({ status: 200, type: PersonaDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PersonaDto> {
    return this.personService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar persona' })
  @ApiResponse({ status: 200, type: PersonaDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarPersonaDto: ModificarPersonaDto): Promise<PersonaDto> {
    return this.personService.update(id, modificarPersonaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar persona' })
  @ApiResponse({ status: 200, type: PersonaDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<PersonaDto> {
    return this.personService.remove(id);
  }
}
