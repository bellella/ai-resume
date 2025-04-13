import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { TemplatesService } from '../templates/templates.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@ai-resume/db';

@Injectable()
export class ResumeService {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createResumeDto: CreateResumeDto, userId: string): Promise<Prisma.ResumeGetPayload<{}>> {
    // check if ai is enabled
    if (createResumeDto.ai?.content) {
      // TODO: Implement AI resume creation
    }
    if (createResumeDto.ai?.grammar) {
      // TODO: Implement AI resume grammar check
    }
    // find template named 'default'
    // const template = await this.prisma.template.findFirst({
    //   where: {
    //     name: 'default',
    //   },
    // });

    // if (!template) {
    //   throw new Error('Default template not found');
    // }
    const template = {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #111;
      padding: 40px;
      max-width: 800px;
      margin: auto;
    }
    h1, h2 {
      margin: 0 0 8px;
    }
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 18px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
      margin-top: 24px;
    }
    .section {
      margin-bottom: 20px;
    }
    .item {
      margin-bottom: 12px;
    }
    .item-title {
      font-weight: bold;
    }
    .sub-info {
      font-size: 13px;
      color: #444;
    }
    .skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }
    .skill-badge {
      background: #eee;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <h1>{{firstName}} {{lastName}}</h1>
  <p>{{email}} | {{phone}} | {{city}}, {{province}} {{postalCode}}</p>

  <div class="section">
    <h2>Professional Summary</h2>
    <p>{{professionalSummary}}</p>
  </div>

  <div class="section">
    <h2>Work Experience</h2>
    {{#each workExperiences}}
    <div class="item">
      <div class="item-title">{{jobTitle}} - {{employer}}</div>
      <div class="sub-info">{{city}}, {{province}} | {{startDate}} – {{endDate}}</div>
    </div>
    {{/each}}
  </div>

  <div class="section">
    <h2>Education</h2>
    {{#each educations}}
    <div class="item">
      <div class="item-title">{{schoolName}}, {{schoolLocation}}</div>
      <div class="sub-info">{{degree}} in {{fieldOfStudy}} | Graduated {{graduationMonth}} {{graduationYear}}</div>
    </div>
    {{/each}}
  </div>

  <div class="section">
    <h2>Skills</h2>
    <div class="skill-list">
      {{#each skills}}
      <div class="skill-badge">{{this}}</div>
      {{/each}}
    </div>
  </div>
</body>
</html>
`,
    }

    // bind template to resume
    const resumeHtml = this.templateService.bindDataToTemplate(
      template.html,
      createResumeDto.resumeJson as unknown as Record<string, unknown>,
    );

    // save resume to DB
    const resume = await this.prisma.resume.create({
      data: {
        title: 'New Resume',
        resumeHtml: resumeHtml,
        resumeJson: createResumeDto.resumeJson as unknown as Prisma.InputJsonValue,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return resume;
  }

  async findAll() {
    return this.prisma.resume.findMany();
  }

  async findOne(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: {
        // resumeJson: updateResumeDto.resumeJson,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.resume.delete({
      where: { id },
    });
  }

  generatePdf(id: string) {
    // TODO: Implement PDF generation using Puppeteer
    return `This action generates PDF for resume #${id}`;
  }

  duplicate(id: string) {
    // TODO: Implement resume duplication
    return `This action duplicates resume #${id}`;
  }
} 