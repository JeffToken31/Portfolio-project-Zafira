import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty({ example: 'Entreprise ABC' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @IsString()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: '+33612345678', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
