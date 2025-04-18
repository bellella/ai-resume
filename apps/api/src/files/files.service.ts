import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class FilesService {
  async generatePdfFromHtml(bodyContent: string, cssContent: string): Promise<Buffer> {
    const html = this.wrapHtml(bodyContent, cssContent);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }

  private wrapHtml(body: string, css: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Resume PDF</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }
}
