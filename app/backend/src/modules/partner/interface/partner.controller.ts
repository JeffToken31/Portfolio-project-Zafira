import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { PartnerService } from '../app/partner.service';
import { CreatePartnerDto } from './dto/register-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from '../domain/partner.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/app/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/app/guards/roles.guard';
import { Role } from '../../../common/decorators/role.decorator';


@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  async createPartner(
    @Body() createPartnerDto: CreatePartnerDto,
  ): Promise<Partner> {
    const { companyName, logoUrl } = createPartnerDto;
    return this.partnerService.createPartner(companyName, logoUrl);
  }

  @Get()
  async getAllPartners(): Promise<Partner[]> {
    return this.partnerService.getAllPartners();
  }

  @Get(':id')
  async getPartnerById(@Param('id') id: string): Promise<Partner> {
    return this.partnerService.getPartnerById(id);
  }

  @Put(':id')
  async updatePartner(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner> {
    const { companyName, logoUrl } = updatePartnerDto;
    return this.partnerService.updatePartner(id, companyName, logoUrl);
  }

  @Delete(':id')
  async deletePartner(@Param('id') id: string): Promise<void> {
    return this.partnerService.deletePartner(id);
  }
}
