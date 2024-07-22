import { Module } from '@nestjs/common';
import { AttendanceController } from './app.controller';
import { AttendanceService } from './app.service';

@Module({
  imports: [],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AppModule {}
