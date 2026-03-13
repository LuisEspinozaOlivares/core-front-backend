import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FiltroBusquedaDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  busqueda?: string;
}