import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearLocalidadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(20)
  codigoPostal: string | null;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  areaAdministrativaId: number;
}