import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContactoDto, CrearContactoDto, ModificarContactoDto } from '../dto';
import { ContactoService } from '../services';

@ApiTags('Contactos')
@ApiBearerAuth('access-token')
@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos los contactos' })
  @ApiResponse({ status: 200, type: [ContactoDto] })
  findAll(): Promise<ContactoDto[]> {
    return this.contactoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contacto' })
  @ApiResponse({ status: 201, type: ContactoDto })
  create(@Body() crearContactoDto: CrearContactoDto): Promise<ContactoDto> {
    return this.contactoService.create(crearContactoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contacto por ID' })
  @ApiResponse({ status: 200, type: ContactoDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactoDto> {
    return this.contactoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un contacto' })
  @ApiResponse({ status: 200, type: ContactoDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() modificarContactoDto: ModificarContactoDto): Promise<ContactoDto> {
    return this.contactoService.update(id, modificarContactoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  @ApiResponse({ status: 200, type: ContactoDto })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ContactoDto> {
    return this.contactoService.remove(id);
  }
}
