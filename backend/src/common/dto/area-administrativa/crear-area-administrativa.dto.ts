import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CrearAreaAdministrativaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigoPostal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  paisId: number;
}