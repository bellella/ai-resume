import { Body, Controller, Header, Post, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('generate/pdf')
  async generatePdf(
    @Body('html') htmlBody: string,
    @Body('css') css: string,
    @Res() res: Response
  ) {
    const pdfBuffer = await this.fileService.generatePdfFromHtml(htmlBody, css);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=resume.pdf',
    });

    res.send(pdfBuffer);
  }
}
