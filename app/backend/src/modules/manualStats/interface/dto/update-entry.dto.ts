import { PartialType } from '@nestjs/mapped-types';
import { CreateManualStatisticDto } from './create-entry.dto';

export class UpdateManualStatisticDto extends PartialType(
  CreateManualStatisticDto,
) {}
