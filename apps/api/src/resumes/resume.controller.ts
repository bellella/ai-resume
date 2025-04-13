import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { UpdateDefaultResumeDto } from './dto/update-default-resume.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../types/request.types';
import { Prisma } from '@ai-resume/db';

@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: RequestWithUser
  ): Promise<Prisma.ResumeGetPayload<{}>> {
    console.log('createResumeDto', req.user.id);
    return this.resumeService.create(createResumeDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
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

  @Post('default')
  @UseGuards(JwtAuthGuard)
  async updateDefaultResume(
    @Body() updateDefaultResumeDto: UpdateDefaultResumeDto,
    @Req() req: RequestWithUser
  ) {
    return this.resumeService.updateDefaultResume(updateDefaultResumeDto, req.user.id);
  }
}
