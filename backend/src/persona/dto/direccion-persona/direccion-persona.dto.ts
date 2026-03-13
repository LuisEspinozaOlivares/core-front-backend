import { ApiProperty } from '@nestjs/swagger';

export class DireccionPersonaDto {
    @ApiProperty({ description: 'ID de la dirección de la persona' })
    id: number;

    @ApiProperty({ description: 'ID de la persona' })
    personaId: number;

    @ApiProperty({ description: 'ID del tipo de dirección' })
    tipoDireccionId: number;

    @ApiProperty({ description: 'Nombre de la calle', nullable: true })
    calle: string | null;

    @ApiProperty({ description: 'Número de la dirección', nullable: true })
    numero: string | null;

    @ApiProperty({ description: 'Bloque o torre', nullable: true })
    bloque: string | null;

    @ApiProperty({ description: 'Número de departamento', nullable: true })
    apartamento: string | null;

    @ApiProperty({ description: 'ID de la localidad', nullable: true })
    localidadId: number | null;

    @ApiProperty({ description: 'Estado activo' })
    active: boolean;

    @ApiProperty({ description: 'Fecha de última actualización', nullable: true })
    updatedAt: Date | null;
}
