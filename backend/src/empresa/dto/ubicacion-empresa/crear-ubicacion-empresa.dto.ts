import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearUbicacionEmpresaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  empresaId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  tipoDireccionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  calle: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  numero?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  bloque?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  apartamento?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  localidadId: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
