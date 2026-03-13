import { ApiProperty } from '@nestjs/swagger';

export class SectorEconomicoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombreSector: string;

  @ApiProperty()
  descripcion: string | null;
}