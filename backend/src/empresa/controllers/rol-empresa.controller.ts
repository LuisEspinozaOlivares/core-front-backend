import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolEmpresaService } from '../services';
import { RolEmpresaDto, CrearRolEmpresaDto, ModificarRolEmpresaDto } from '../dto';

@ApiTags('Rol Empresa')
@ApiBearerAuth('access-token')
@Controller('rol-empresa')
export class RolEmpresaController {
  constructor(private readonly rolEmpresaService: RolEmpresaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos los roles de empresa' })
  @ApiResponse({ status: HttpStatus.OK, type: [RolEmpresaDto] })
  async findAll(): Promise<RolEmpresaDto[]> {
    return this.rolEmpresaService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol de empresa' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RolEmpresaDto })
  async create(@Body() crearDto: CrearRolEmpresaDto): Promise<RolEmpresaDto> {
    return this.rolEmpresaService.create(crearDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol de empresa por ID' })
  @ApiResponse({ status: HttpStatus.OK, type: RolEmpresaDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RolEmpresaDto> {
    return this.rolEmpresaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol de empresa' })
  @ApiResponse({ status: HttpStatus.OK, type: RolEmpresaDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() modificarDto: ModificarRolEmpresaDto,
  ): Promise<RolEmpresaDto> {
    return this.rolEmpresaService.update(id, modificarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol de empresa' })
  @ApiResponse({ status: HttpStatus.OK, type: RolEmpresaDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<RolEmpresaDto> {
    return this.rolEmpresaService.remove(id);
  }
}
