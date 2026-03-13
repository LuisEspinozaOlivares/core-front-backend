import { ApiProperty } from '@nestjs/swagger';

export class ProfesionalAreaDto {
  @ApiProperty()
  profesionalAreaId: number;

  @ApiProperty()
  nombreArea: string;
}
