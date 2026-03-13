import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearEmpresaRolDto, EmpresaRolDto, ModificarEmpresaRolDto } from '../dto';
import { EmpresaRolService } from '../services';

@ApiTags('Empresa Roles')
@ApiBearerAuth('access-token')
@Controller('empresa-rol')
export class EmpresaRolController {
  constructor(private readonly empresaRolService: EmpresaRolService) { }

  @Get()
  @ApiOperation({ summary: 'Listar roles de empresa' })
  @ApiResponse({ status: 200, type: [EmpresaRolDto] })
  findAll(): Promise<EmpresaRolDto[]> {
    return this.empresaRolService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Asignar rol a empresa' })
  @ApiResponse({ status: 201, type: EmpresaRolDto })
  create(@Body() crearEmpresaRolDto: CrearEmpresaRolDto): Promise<EmpresaRolDto> {
    return this.empresaRolService.create(crearEmpresaRolDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener rol de empresa por ID' })
  @ApiResponse({ status: 200, type: EmpresaRolDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmpresaRolDto> {
    return this.empresaRolService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar rol de empresa' })
  @ApiResponse({ status: 200, type: EmpresaRolDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarEmpresaRolDto: ModificarEmpresaRolDto): Promise<EmpresaRolDto> {
    return this.empresaRolService.update(id, modificarEmpresaRolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar rol de empresa' })
  @ApiResponse({ status: 200, type: EmpresaRolDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<EmpresaRolDto> {
    return this.empresaRolService.remove(id);
  }
}
