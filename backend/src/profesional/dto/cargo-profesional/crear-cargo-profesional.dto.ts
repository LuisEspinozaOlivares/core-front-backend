import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearCargoProfesionalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombreCargo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(150)
  descripcion?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
