import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { FilesService } from './file.service';
import { Response } from 'express';
import { GeneratePdfRequest } from '@ai-resume/types';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

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
