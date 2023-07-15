import { Module } from '@nestjs/common';
import { AccService } from './acc.service';
import { AccController } from './acc.controller';

@Module({
  controllers: [AccController],
  providers: [AccService]
})
export class AccModule {}
