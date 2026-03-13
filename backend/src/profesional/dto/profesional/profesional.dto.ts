import { ApiProperty } from '@nestjs/swagger';

export class ProfesionalDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    personaId: number;

    @ApiProperty()
    empresaId: number;

    @ApiProperty({ required: false })
    fechaIngreso?: Date | null;

    @ApiProperty({ required: false })
    fechaTermino?: Date | null;

    @ApiProperty()
    estadoProfesionalId: number;

    @ApiProperty({ required: false })
    tipoContratoId?: number | null;

    @ApiProperty()
    profesionalCargoId: number;

    @ApiProperty()
    profesionalAreaId: number;

    @ApiProperty({ required: false })
    profesionalJefaturaId?: number | null;

    @ApiProperty({ required: false })
    previsionSaludId?: number | null;

    @ApiProperty({ required: false })
    afpId?: number | null;

    @ApiProperty({ required: false })
    cajaCompensacionId?: number | null;

    @ApiProperty()
    activo: boolean;

    @ApiProperty({ required: false })
    talanaId?: number | null;

    @ApiProperty({ required: false })
    createdAt?: Date | null;

    @ApiProperty({ required: false })
    updatedAt?: Date | null;
}
