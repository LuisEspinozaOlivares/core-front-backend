import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearTipoDireccionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  descripcion: string;
}