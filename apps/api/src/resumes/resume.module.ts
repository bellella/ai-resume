import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrismaService } from '../prisma/prisma.service';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [TemplatesModule],
  controllers: [ResumeController],
  providers: [ResumeService, PrismaService],
})
export class ResumeModule {}
