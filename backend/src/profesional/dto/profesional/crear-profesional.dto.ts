import { IsInt, IsOptional, IsDateString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearProfesionalDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    personaId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    empresaId: number;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    fechaIngreso?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    fechaTermino?: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    estadoProfesionalId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    tipoContratoId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    profesionalCargoId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    profesionalAreaId: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    profesionalJefaturaId?: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    previsionSaludId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    afpId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    cajaCompensacionId: number;

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    talanaId?: number;
}
