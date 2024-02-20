import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationParam {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit?: number;
}
