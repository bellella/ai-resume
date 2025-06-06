import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    // return this.prisma.template.create({
    //   data,
    // });
  }

  async findAll() {
    // return this.prisma.template.findMany({
    //   where: {
    //     status: {
    //       not: 'DELETED',
    //     },
    //   },
    // });
  }

  async findOne(id: string) {
    // return this.prisma.template.findUnique({
    //   where: { id },
    // });
  }

  async update(id: string, data: UpdateTemplateDto) {
    // return this.prisma.template.update({
    //   where: { id },
    //   data,
    // });
  }

  async remove(id: string) {
    // return this.prisma.template.update({
    //   where: { id },
    //   data: {
    //     status: 'DELETED',
    //   },
    // });
  }

  async createTemplatePreviews() {
    // const templates = await this.prisma.template.findMany({
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    // if (!templates || templates.length === 0) {
    //   throw new Error('Template not found');
    // }
    // return templates.map((template) => ({
    //   ...template,
    //   previewHtml: this.bindDataToTemplate(template.html, resumeJson),
    // }));
  }

  bindDataToTemplate(template: string, data: Record<string, any>) {
    // let result = template;
    // // Step 1: Handle array sections like {{#each workExperiences}}...{{/each}}
    // const eachPattern = /{{#each (\w+)}}([\s\S]*?){{\/each}}/g;
    // result = result.replace(eachPattern, (match, arrayKey, blockTemplate) => {
    //   const arr = data[arrayKey];
    //   if (!Array.isArray(arr)) return '';
    //   return arr
    //     .map((item) => {
    //       // Handle string array (e.g., skills)
    //       if (typeof item === 'string') {
    //         return blockTemplate.replace(/{{this}}/g, item);
    //       }
    //       // Handle object array (e.g., workExperiences)
    //       return blockTemplate.replace(/{{(\w+)}}/g, (_, key) => {
    //         return item[key] !== undefined ? String(item[key]) : '';
    //       });
    //     })
    //     .join('');
    // });
    // // Step 2: Replace simple {{key}} placeholders
    // result = result.replace(/{{(\w+)}}/g, (_, key) => {
    //   return data[key] !== undefined ? String(data[key]) : '';
    // });
    // return result;
  }
}
