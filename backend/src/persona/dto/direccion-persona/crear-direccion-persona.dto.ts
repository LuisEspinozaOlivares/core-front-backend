import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearDireccionPersonaDto {
    @ApiProperty({ description: 'ID de la persona' })
    @IsInt()
    personaId: number;

    @ApiProperty({ description: 'ID del tipo de dirección' })
    @IsInt()
    tipoDireccionId: number;

    @ApiProperty({ description: 'Nombre de la calle', nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    calle?: string;

    @ApiProperty({ description: 'Número de la dirección', nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    numero?: string;

    @ApiProperty({ description: 'Bloque o torre', nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    bloque?: string;

    @ApiProperty({ description: 'Número de departamento', nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    apartamento?: string;

    @ApiProperty({ description: 'ID de la localidad', nullable: true })
    @IsOptional()
    @IsInt()
    localidadId?: number;

    @ApiProperty({ description: 'Estado activo', default: true, nullable: true })
    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}
