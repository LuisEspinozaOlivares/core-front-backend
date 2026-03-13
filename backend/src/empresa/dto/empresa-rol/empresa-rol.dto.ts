import { ApiProperty } from '@nestjs/swagger';

export class EmpresaRolDto {
  @ApiProperty()
  empresaRolId: number;

  @ApiProperty()
  empresaId: number;

  @ApiProperty()
  rolEmpresaId: number;

  @ApiProperty({ required: false, nullable: true })
  fechaAsignacion: Date | null;

  @ApiProperty({ required: false, nullable: true })
  activo: boolean | null;
}
