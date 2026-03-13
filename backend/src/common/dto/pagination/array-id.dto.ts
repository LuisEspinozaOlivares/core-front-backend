import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class ArrayIdDto {
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}