import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContactoEmpresaService } from '../services/contacto-empresa.service';
import { ContactoEmpresaDto, CrearContactoEmpresaDto, ModificarContactoEmpresaDto } from '../dto';

@ApiTags('Contacto Empresa')
@ApiBearerAuth('access-token')
@Controller('contacto-empresa')
export class ContactoEmpresaController {
  constructor(private readonly service: ContactoEmpresaService) { }

  @Get()
  @ApiOperation({ summary: 'Listar contactos de empresa' })
  @ApiResponse({ status: 200, type: [ContactoEmpresaDto] })
  findAll(): Promise<ContactoEmpresaDto[]> {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear contacto de empresa' })
  @ApiResponse({ status: 201, type: ContactoEmpresaDto })
  create(@Body() dto: CrearContactoEmpresaDto): Promise<ContactoEmpresaDto> {
    return this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener contacto de empresa por ID' })
  @ApiResponse({ status: 200, type: ContactoEmpresaDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactoEmpresaDto> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar contacto de empresa' })
  @ApiResponse({ status: 200, type: ContactoEmpresaDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModificarContactoEmpresaDto,
  ): Promise<ContactoEmpresaDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar contacto de empresa' })
  @ApiResponse({ status: 200, type: ContactoEmpresaDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ContactoEmpresaDto> {
    return this.service.remove(id);
  }
}
