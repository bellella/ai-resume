import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { UpdateDefaultResumeDto } from './dto/update-default-resume.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../types/request.types';
import { Prisma } from '@ai-resume/db';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('resumes')
@ApiBearerAuth('access-token')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: RequestWithUser
  ): Promise<Prisma.ResumeGetPayload<{}>> {
    return this.resumeService.create(createResumeDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.resumeService.findAll();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Req() req: RequestWithUser) {
    return this.resumeService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @Patch('default')
  @UseGuards(JwtAuthGuard)
  async updateDefaultResume(
    @Body() updateDefaultResumeDto: UpdateDefaultResumeDto,
    @Req() req: RequestWithUser
  ) {
    return this.resumeService.updateDefaultResume(
      updateDefaultResumeDto.defaultResumeJson,
      req.user.id
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(id, updateResumeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resumeService.remove(id);
  }

  @Post(':id/pdf')
  @UseGuards(JwtAuthGuard)
  generatePdf(@Param('id') id: string) {
    return this.resumeService.generatePdf(id);
  }

  @Post(':id/duplicate')
  @UseGuards(JwtAuthGuard)
  duplicate(@Param('id') id: string) {
    return this.resumeService.duplicate(id);
  }
}
