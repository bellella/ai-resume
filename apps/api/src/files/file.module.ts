import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FileController } from './file.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  controllers: [FileController],
  providers: [FilesService],
  imports: [AiModule],
})
export class FileModule {}
