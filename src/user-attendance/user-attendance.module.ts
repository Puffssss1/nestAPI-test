import { Module } from '@nestjs/common';
import { UserAttendanceController } from './user-attendance.controller';
import { AttendanceService } from './user-attendance.service';
import { AttendanceRepository } from './attendance.repository';

@Module({
  controllers: [UserAttendanceController],
  providers: [AttendanceService, AttendanceRepository], // Make sure AttendanceRepository is listed here
  exports: [AttendanceService, AttendanceRepository], // Export AttendanceRepository if needed in other modules
})
export class UserAttendanceModule {}
