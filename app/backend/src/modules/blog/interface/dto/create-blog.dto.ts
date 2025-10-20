import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { MediaType } from '../../domain/blog.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'my-first-blog-post' })
  @IsOptional()
  @IsString()
  slug: string; // ✅ ajouté

  @ApiProperty({ example: 'This is the full content of the blog.' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'This is a short excerpt.', required: false })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg', required: false })
  @IsOptional()
  @IsUrl({ require_tld: false })
  coverImageUrl?: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', required: false })
  @IsOptional()
  @IsUrl({ require_tld: false })
  mediaUrl?: string;

  @ApiProperty({ enum: MediaType, required: false })
  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @ApiProperty({ example: '2025-10-07T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
