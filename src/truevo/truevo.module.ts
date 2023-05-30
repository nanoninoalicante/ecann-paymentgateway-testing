import { Module } from '@nestjs/common';
import { TruevoService } from './truevo.service';
import { TruevoController } from './truevo.controller';

@Module({
  providers: [TruevoService],
  controllers: [TruevoController]
})
export class TruevoModule {}
