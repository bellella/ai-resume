import {
  Body,
  Controller,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { Response } from 'express';
import { GeneratePdfRequest } from '@ai-resume/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from '../ai/ai.service';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FilesService,
    private readonly aiService: AiService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url = await this.fileService.uploadToS3(file);
    return { url };
  }

  /**
   * Generates a PDF from HTML content and sends it as a response
   */
  @Post('generate/pdf')
  async generatePdf(@Body() data: GeneratePdfRequest, @Res() res: Response) {
    const pdfBuffer = await this.fileService.generatePdfFromHtml(data.html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
    });

    res.send(pdfBuffer);
  }

  @Post('parse-resume')
  @UseInterceptors(FileInterceptor('file'))
  async parseResume(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const text = await this.fileService.extractText(file);
    const resumeJson = await this.aiService.parseResumeFromText(text);
    return resumeJson;
  }
}
