import { ApiProperty } from '@nestjs/swagger';

export class ProfesionalCvDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  profesionalId: number;

  @ApiProperty()
  tipoCvId: number;

  @ApiProperty()
  urlDocumento: string;

  @ApiProperty({ required: false })
  nombreArchivo: string | null;

  @ApiProperty({ required: false })
  fechaCarga: Date | null;

  @ApiProperty({ required: false })
  activo: boolean | null;
}
