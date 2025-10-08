import {
  IsString,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActionDto {
  @ApiProperty({ example: 'Atelier de réinsertion professionnelle' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Session d’aide à la recherche d’emploi' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ example: '2025-10-08T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
