import { ApiProperty } from '@nestjs/swagger';

export class EstadoCivilDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descripcion: string;
}
