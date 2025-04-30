import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resumes/resume.module';
import { CoinModule } from './coins/coin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TemplatesModule } from './templates/templates.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './stripe/stripe.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilesModule,
    PrismaModule,
    ResumeModule,
    CoinModule,
    StripeModule,
    AuthModule,
    UsersModule,
    TemplatesModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
