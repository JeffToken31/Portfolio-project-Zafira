import {
  IsEnum,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ManualStatisticType } from '../../domain/manualStatsType.enum';

class ManualStatisticEntryDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateManualStatisticDto {
  @ApiProperty({ enum: ManualStatisticType })
  @IsEnum(ManualStatisticType)
  type: ManualStatisticType;

  @ApiProperty({ type: [ManualStatisticEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ManualStatisticEntryDto)
  entries: ManualStatisticEntryDto[];
}
