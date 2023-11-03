import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReqService } from 'src/http/req.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(private readonly reqService: ReqService) {}

  @Cron('0 10 * * * *')
  handleCron() {
    this.logger.debug('Called every hour, at the start of the 10th minute');
    this.reqService.sendMsg();
  }
}
