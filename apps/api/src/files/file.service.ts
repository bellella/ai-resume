import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  private s3: S3;
  private bucket: string;

  constructor(private config: ConfigService) {
    this.bucket = this.config.get<string>('S3_BUCKET', 'ai-resume-bucket');

    this.s3 = new S3({
      region: this.config.get<string>('S3_REGION', 'ap-northeast-2'),
      credentials: {
        accessKeyId: this.config.get<string>('S3_ACCESS_KEY', 'AKIA33333333333333333'),
        secretAccessKey: this.config.get<string>(
          'S3_SECRET_KEY',
          '3333333333333333333333333333333333333333'
        ),
      },
    });
  }

  /**
   * Uploads a file to S3
   */
  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const key = `uploads/${uuid()}.${ext}`;

    await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return `https://${this.bucket}.s3.${this.config.get('S3_REGION')}.amazonaws.com/${key}`;
  }

  /**
   * Generates a PDF from HTML content
   */
  async generatePdfFromHtml(bodyContent: string): Promise<Buffer> {
    const html = this.wrapHtml(bodyContent);

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
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

  /**
   * Wraps HTML content with a basic HTML structure
   */
  private wrapHtml(body: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Resume PDF</title>
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }
}
