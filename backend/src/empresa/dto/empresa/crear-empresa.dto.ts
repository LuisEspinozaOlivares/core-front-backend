import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearEmpresaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  rutEmpresa: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nombreComercial?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  razonSocial: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  sitioWeb?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  giroActividadId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  tipoSociedadId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  sectorEconomicoId?: number;
}
