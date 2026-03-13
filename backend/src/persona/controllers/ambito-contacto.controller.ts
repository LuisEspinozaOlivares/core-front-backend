import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrearAmbitoContactoDto, AmbitoContactoDto, ModificarAmbitoContactoDto } from '../dto';
import { AmbitoContactoService } from '../services';

@ApiTags('Ambito Contacto')
@ApiBearerAuth('access-token')
@Controller('ambito-contacto')
export class AmbitoContactoController {
    constructor(private readonly ambitoContactoService: AmbitoContactoService) { }

    @Get()
    @ApiOperation({ summary: 'Listar ámbitos de contacto' })
    @ApiResponse({ status: 200, type: [AmbitoContactoDto] })
    findAll(): Promise<AmbitoContactoDto[]> {
        return this.ambitoContactoService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Crear ámbito de contacto' })
    @ApiResponse({ status: 201, type: AmbitoContactoDto })
    create(@Body() createAmbitoContactoDto: CrearAmbitoContactoDto): Promise<AmbitoContactoDto> {
        return this.ambitoContactoService.create(createAmbitoContactoDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener ámbito de contacto por ID' })
    @ApiResponse({ status: 200, type: AmbitoContactoDto })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<AmbitoContactoDto> {
        return this.ambitoContactoService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar ámbito de contacto' })
    @ApiResponse({ status: 200, type: AmbitoContactoDto })
    update(@Param('id', ParseIntPipe) id: number, @Body() modificarAmbitoContactoDto: ModificarAmbitoContactoDto): Promise<AmbitoContactoDto> {
        return this.ambitoContactoService.update(id, modificarAmbitoContactoDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar ámbito de contacto' })
    @ApiResponse({ status: 200, type: AmbitoContactoDto })
    remove(@Param('id', ParseIntPipe) id: number): Promise<AmbitoContactoDto> {
        return this.ambitoContactoService.remove(id);
    }
}
