import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  //UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage } from '../infra/upload.storage';
import { UploadService } from '../app/upload.service';
import type { UploadedFileEntity } from '../domain/upload.entity';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
// import { RolesGuard } from '../../../common/guards/roles.guard';
// import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('uploads')
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Upload a single file (image/video)
   * Only admin can upload
   */
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Upload a single file (image/video)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', multerStorage))
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadedFileEntity {
    return this.uploadService.handleFile(file);
  }
}
