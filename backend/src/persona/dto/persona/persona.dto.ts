import { ApiProperty } from '@nestjs/swagger';

export class PersonaDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tipoIdentificacionId: number;

    @ApiProperty()
    numeroIdentificacion: string;

    @ApiProperty()
    nombresPersona: string;

    @ApiProperty()
    primerApellido: string;

    @ApiProperty({ required: false })
    segundoApellido?: string | null;

    @ApiProperty({ required: false })
    fechaNacimiento?: Date | null;

    @ApiProperty({ required: false })
    nacionalidadId?: number | null;

    @ApiProperty({ required: false })
    generoId?: number | null;

    @ApiProperty({ required: false })
    estadoCivilId?: number | null;

    @ApiProperty({ required: false })
    paisOrigenId?: number | null;

    @ApiProperty({ required: false })
    paisResidenciaId?: number | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false })
    createdBy?: string | null;

    @ApiProperty({ required: false })
    updatedBy?: string | null;

    @ApiProperty()
    active: boolean;
}
