import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from './register-partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
