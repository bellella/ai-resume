import { Body, Controller, Header, Post, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './file.service';
import { Response } from 'express';
import { GeneratePdfRequest } from '@ai-resume/types';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

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
}
