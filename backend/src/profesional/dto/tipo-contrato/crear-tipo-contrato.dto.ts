import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearTipoContratoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
