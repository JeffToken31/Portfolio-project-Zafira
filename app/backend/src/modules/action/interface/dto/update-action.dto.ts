import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-action.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
