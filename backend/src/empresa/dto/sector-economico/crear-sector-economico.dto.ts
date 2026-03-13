import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearSectorEconomicoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombreSector: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion: string | null;
}