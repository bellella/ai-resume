import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FilesService],
})
export class FileModule {}
