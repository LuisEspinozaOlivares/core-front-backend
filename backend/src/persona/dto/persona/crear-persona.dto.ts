import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearPersonaDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    tipoIdentificacionId: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    numeroIdentificacion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nombresPersona: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    primerApellido: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    segundoApellido?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    fechaNacimiento?: string;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    nacionalidadId?: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    generoId?: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    estadoCivilId?: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    paisOrigenId?: number | null;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    paisResidenciaId?: number | null;
}
