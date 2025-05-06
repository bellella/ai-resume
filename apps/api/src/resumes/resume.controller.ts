import {
  CreateResumeResponse,
  FetchResumeResponse,
  FetchResumesResponse,
  UpdateDefaultResumeResponse,
  UpdateResumeResponse,
} from '@ai-resume/types';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../types/request.types';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateDefaultResumeDto } from './dto/update-default-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';

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
  ): Promise<CreateResumeResponse> {
    return this.resumeService.create(createResumeDto, req.user.id);
  }

  /**
   * Retrieves all resumes for the authenticated user.
   */
  @Get('user')
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Req() req: RequestWithUser): Promise<FetchResumesResponse> {
    return this.resumeService.findAllByUserId(req.user.id);
  }

  /**
   * Retrieves a specific resume by ID.
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<FetchResumeResponse> {
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
  ): Promise<UpdateDefaultResumeResponse> {
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
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto
  ): Promise<UpdateResumeResponse> {
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
   * Duplicates a specific resume by ID.
   */
  @Post(':id/duplicate')
  @UseGuards(JwtAuthGuard)
  duplicate(@Param('id') id: string) {
    return this.resumeService.duplicate(id);
  }
}
