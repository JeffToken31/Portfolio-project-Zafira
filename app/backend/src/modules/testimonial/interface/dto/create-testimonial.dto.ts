import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({ example: 'Une expérience formidable !' })
  @IsString()
  content: string;

  @ApiProperty({
    example: true,
    required: false,
    description: 'Indique si le témoignage est publié',
  })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({
    example: '2025-10-08T10:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;

  @ApiProperty({
    example: false,
    required: false,
    description: 'Indique si le témoignage a été validé par un admin',
  })
  @IsOptional()
  @IsBoolean()
  validated?: boolean;
}
