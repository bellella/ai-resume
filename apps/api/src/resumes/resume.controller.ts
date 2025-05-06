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

  /**
   * Creates a new resume for the authenticated user.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createResumeDto: CreateResumeDto,
    @Req() req: RequestWithUser
  ): Promise<Prisma.ResumeGetPayload<{}>> {
    return this.resumeService.create(createResumeDto, req.user.id);
  }

  /**
   * Retrieves all resumes.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.resumeService.findAll();
  }

  /**
   * Retrieves all resumes for the authenticated user.
   */
  @Get('user')
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Req() req: RequestWithUser) {
    return this.resumeService.findAllByUserId(req.user.id);
  }

  /**
   * Retrieves a specific resume by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  /**
   * Updates the default resume for the authenticated user.
   */
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

  /**
   * Updates a specific resume by ID.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(id, updateResumeDto);
  }

  /**
   * Removes a specific resume by ID.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resumeService.remove(id);
  }

  /**
   * Generates a PDF for a specific resume by ID.
   */
  @Post(':id/pdf')
  @UseGuards(JwtAuthGuard)
  generatePdf(@Param('id') id: string) {
    return this.resumeService.generatePdf(id);
  }

  /**
   * Duplicates a specific resume by ID.
   */
  @Post(':id/duplicate')
  @UseGuards(JwtAuthGuard)
  duplicate(@Param('id') id: string) {
    return this.resumeService.duplicate(id);
  }
}
