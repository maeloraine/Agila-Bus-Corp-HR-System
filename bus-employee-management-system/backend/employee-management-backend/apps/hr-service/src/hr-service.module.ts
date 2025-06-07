import { Module } from '@nestjs/common';
import { HrServiceController } from './hr-service.controller';
import { HrServiceService } from './hr-service.service';

@Module({
  imports: [],
  controllers: [HrServiceController],
  providers: [HrServiceService],
})
export class HrServiceModule {}
