import { ApiProperty } from '@nestjs/swagger';

export class GeneroDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty({ required: false })
  descripcion?: string | null;
}