import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ActionService } from '../app/action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ActionDtoMapper } from './dto/action-dto.mapper';
import { Action } from '../domain/action.entity';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('actions')
@Controller('actions')
export class ActionController {
  constructor(
    @Inject(ActionService)
    private readonly actionService: ActionService,
  ) {}

  // CREATE
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('beneficiary')
  @ApiOperation({ summary: 'Create a new action' })
  @ApiResponse({ status: 201, description: 'Action successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() dto: CreateActionDto): Promise<Record<string, unknown>> {
    try {
      const action: Action = ActionDtoMapper.toDomainFromCreate(dto);
      const created = await this.actionService.create(action);
      return created.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while creating action');
    }
  }

  // UPDATE (PUT)
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Fully update an action' })
  @ApiResponse({ status: 200, description: 'Action successfully updated.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateActionDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.actionService.getById(id);
      const actionToUpdate = ActionDtoMapper.toDomainFromUpdate(dto, existing);
      const updated = await this.actionService.update(actionToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while updating action');
    }
  }

  // PATCH (PARTIAL UPDATE)
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Partially update an action' })
  @ApiResponse({ status: 200, description: 'Action partially updated.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async patch(
    @Param('id') id: string,
    @Body() dto: UpdateActionDto,
  ): Promise<Record<string, unknown>> {
    try {
      const existing = await this.actionService.getById(id);
      const actionToUpdate = ActionDtoMapper.toDomainFromUpdate(dto, existing);
      const updated = await this.actionService.update(actionToUpdate);
      return updated.toJSON();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while patching action');
    }
  }

  // DELETE
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an action by ID' })
  @ApiResponse({ status: 204, description: 'Action deleted.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async delete(@Param('id') id: string) {
    try {
      await this.actionService.delete(id);
      return { message: `Action ${id} deleted successfully.` };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while deleting action');
    }
  }

  // GET ONE BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an action by ID' })
  @ApiResponse({ status: 200, description: 'Action details.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async findById(@Param('id') id: string): Promise<Record<string, unknown>> {
    const action = await this.actionService.getById(id);
    return action.toJSON();
  }

  // GET ALL / FILTERED / LIMITED
  @Get()
  @ApiOperation({
    summary: 'Get all actions (with optional filters)',
    description:
      'Supports query params like `?limit=3` or `?published=true` for filtering.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of returned actions',
  })
  @ApiQuery({
    name: 'published',
    required: false,
    type: Boolean,
    description: 'Filter only published actions',
  })
  @ApiResponse({ status: 200, description: 'List of actions.' })
  async findAll(
    @Query('limit') limit?: number,
    @Query('published') published?: boolean,
  ): Promise<Record<string, unknown>[]> {
    try {
      const actions = await this.actionService.getAll({
        limit: limit ? Number(limit) : undefined,
        published:
          typeof published === 'string'
            ? published === 'true'
            : (published ?? undefined),
      });
      return actions.map((a) => a.toJSON());
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Unknown error while fetching actions');
    }
  }

  @Patch(':id/publish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Publish an action' })
  @ApiResponse({ status: 200, description: 'Action published successfully.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async publish(@Param('id') id: string) {
    const action = await this.actionService.publish(id);
    return ActionDtoMapper.toResponse(action);
  }

  @Patch(':id/unpublish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Unpublish an action' })
  @ApiResponse({ status: 200, description: 'Action unpublished successfully.' })
  @ApiResponse({ status: 404, description: 'Action not found.' })
  async unpublish(@Param('id') id: string) {
    const action = await this.actionService.unpublish(id);
    return ActionDtoMapper.toResponse(action);
  }
}
