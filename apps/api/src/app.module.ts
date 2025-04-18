import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resumes/resume.module';
import { CoinsModule } from './coins/coins.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TemplatesModule } from './templates/templates.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    FilesModule,
    PrismaModule,
    ResumeModule,
    CoinsModule,
    AuthModule,
    UsersModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
