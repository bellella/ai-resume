import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplatesService } from './templates.service';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  // @Post()
  // @Roles(Role.ADMIN)
  // @Post()
  // @UseGuards(JwtAuthGuard)
  // async create(@Body() createTemplateDto: Template) {
  //   return this.templatesService.create(createTemplateDto);
  // }

  // @Get()
  // async findAll() {
  //   return this.templatesService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.templatesService.findOne(id);
  // }

  // @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // async update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
  //   return this.templatesService.update(id, updateTemplateDto);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // async remove(@Param('id') id: string) {
  //   return this.templatesService.remove(id);
  // }

  // @Post('previews')
  // async createTemplatePreviews(
  //   @Body() createTemplateDto: CreateTemplateDto
  // ): Promise<TemplateWithPreviewHtml[]> {
  //   return this.templatesService.createTemplatePreviews(createTemplateDto.resumeJson);
  // }
}
