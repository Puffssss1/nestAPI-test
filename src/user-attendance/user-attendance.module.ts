import { Module } from '@nestjs/common';
import { UserAttendanceController } from './user-attendance.controller';
import { UserAttendanceService } from './user-attendance.service';

@Module({
  controllers: [UserAttendanceController],
  providers: [UserAttendanceService],
})
export class UserAttendanceModule {}
