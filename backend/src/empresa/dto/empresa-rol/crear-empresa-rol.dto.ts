import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CrearEmpresaRolDto {
  @ApiProperty()
  @IsNumber()
  empresaId: number;

  @ApiProperty()
  @IsNumber()
  rolEmpresaId: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
