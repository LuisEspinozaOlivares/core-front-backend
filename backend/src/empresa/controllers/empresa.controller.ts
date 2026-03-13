import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmpresaService } from '../services';
import { CrearEmpresaDto, EmpresaDto, EmpresaSimpleDto, ModificarEmpresaDto } from '../dto';
import { PaginationRequestDto, PaginationResponseDto, ArrayIdDto } from '../../common/dto';
import { FiltroBusquedaDto } from 'src/common/dto/filtro/filtro-busqueda.dto';

@ApiTags('Empresa')
@ApiBearerAuth('access-token')
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar empresas activas' })
  @ApiResponse({ status: 200, type: PaginationResponseDto<EmpresaDto> })
  findAll(@Query() paginationRequestDto: PaginationRequestDto): Promise<PaginationResponseDto<EmpresaDto>> {
    return this.empresaService.findAll(paginationRequestDto);
  }

  @Get('busqueda')
  @ApiOperation({ summary: 'Buscar empresas' })
  @ApiResponse({ status: 200, type: [EmpresaSimpleDto] })
  findAllWithSearch(@Query() filtroBusqueda: FiltroBusquedaDto): Promise<EmpresaSimpleDto[]> {
    return this.empresaService.findAllWithSearch(filtroBusqueda);
  }

  @Post('contactos')
  @ApiOperation({ summary: 'Listar empresas con contactos' })
  @ApiResponse({ status: 200, type: [EmpresaSimpleDto] })
  findAllWithContacts(@Body() dto: ArrayIdDto): Promise<EmpresaSimpleDto[]> {
    return this.empresaService.findAllWithContacts(dto.ids);
  }

  @Post()
  @ApiOperation({ summary: 'Crear empresa' })
  @ApiResponse({ status: 201, type: EmpresaDto })
  create(@Body() crearEmpresaDto: CrearEmpresaDto): Promise<EmpresaDto> {
    return this.empresaService.create(crearEmpresaDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener empresa por ID' })
  @ApiResponse({ status: 200, type: EmpresaDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmpresaDto> {
    return this.empresaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar empresa' })
  @ApiResponse({ status: 200, type: EmpresaDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarEmpresaDto: ModificarEmpresaDto): Promise<EmpresaDto> {
    return this.empresaService.update(id, modificarEmpresaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar empresa' })
  @ApiResponse({ status: 200, type: EmpresaDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<EmpresaDto> {
    return this.empresaService.remove(id);
  }
}
