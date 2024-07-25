import { Module } from '@nestjs/common';
import { UserAttendanceController } from './user-attendance.controller';
import { AttendanceService } from './user-attendance.service';
import { AttendanceRepository } from './attendance.repository';

@Module({
  controllers: [UserAttendanceController],
  providers: [AttendanceService, AttendanceRepository],
  exports: [AttendanceService, AttendanceRepository],
})
export class UserAttendanceModule {}
