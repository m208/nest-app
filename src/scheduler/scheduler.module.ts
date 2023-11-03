import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ReqModule } from 'src/http/req.module';

@Module({
  imports: [ReqModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
