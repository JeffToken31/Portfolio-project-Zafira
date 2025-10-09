import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;
}
