import { IsInt, IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearContactoDto {
  @ApiProperty()
  @IsInt()
  personaId: number;

  @ApiProperty()
  @IsInt()
  tipoContactoId: number;

  @ApiProperty()
  @IsInt()
  ambitoContactoId: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  valor: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  principal?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
