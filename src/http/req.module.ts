import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReqService } from './req.service';
import { ReqController } from './req.controller';

@Module({
  imports: [HttpModule],
  providers: [ReqService],
  controllers: [ReqController],
})
export class ReqModule {}
