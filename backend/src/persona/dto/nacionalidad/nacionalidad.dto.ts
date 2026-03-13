import { ApiProperty } from '@nestjs/swagger';

export class NacionalidadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty({ required: false })
  gentilicio?: string | null;
}