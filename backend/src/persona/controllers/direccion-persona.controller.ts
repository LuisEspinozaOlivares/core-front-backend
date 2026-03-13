import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearDireccionPersonaDto, DireccionPersonaDto, ModificarDireccionPersonaDto } from '../dto';
import { DireccionPersonaService } from '../services';

@ApiTags('Dirección Persona')
@ApiBearerAuth('access-token')
@Controller('direccion-persona')
export class DireccionPersonaController {
    constructor(private readonly direccionPersonaService: DireccionPersonaService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas las direcciones de personas activas' })
    @ApiResponse({ status: 200, type: [DireccionPersonaDto] })
    findAll(): Promise<DireccionPersonaDto[]> {
        return this.direccionPersonaService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva dirección de persona' })
    @ApiResponse({ status: 201, type: DireccionPersonaDto })
    create(@Body() crearDto: CrearDireccionPersonaDto): Promise<DireccionPersonaDto> {
        return this.direccionPersonaService.create(crearDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una dirección de persona por ID' })
    @ApiResponse({ status: 200, type: DireccionPersonaDto })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<DireccionPersonaDto> {
        return this.direccionPersonaService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una dirección de persona' })
    @ApiResponse({ status: 200, type: DireccionPersonaDto })
    update(@Param('id', ParseIntPipe) id: number, @Body() modificarDto: ModificarDireccionPersonaDto): Promise<DireccionPersonaDto> {
        return this.direccionPersonaService.update(id, modificarDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Desactivar una dirección de persona' })
    @ApiResponse({ status: 200 })
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.direccionPersonaService.remove(id);
    }
}
