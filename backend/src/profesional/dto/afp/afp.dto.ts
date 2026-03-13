import { ApiProperty } from '@nestjs/swagger';

export class AfpDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  activo: boolean | null;
}
