import { Module } from '@nestjs/common';
import { OpenAI } from 'openai';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { CoinModule } from '../coins/coin.module';
@Module({
  controllers: [AiController],
  imports: [OpenAI, CoinModule],
  providers: [AiService],
})
export class AiModule {}
