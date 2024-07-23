import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserAttendanceService } from './user-attendance.service';
import { Attendance } from './mockData';

@Controller('user-attendance')
export class UserAttendanceController {
  constructor(private readonly UserAttendanceService: UserAttendanceService) {}

  @Get()
  getAllAttendance(): Attendance[] {
    return this.UserAttendanceService.getAllAttendance();
  }

  @Get('getAttendanceById/:id')
  getByID(@Param('id') id: string): Attendance | undefined {
    const attendanceID = +id;
    return this.UserAttendanceService.findById(attendanceID);
  }

  @Post('addAttendee')
  addAttendee(@Body() attendee: Partial<Attendance>): Attendance | undefined {
    const attendeeData = attendee;
    if (!attendee.email || !attendee.types) return undefined;

    return this.UserAttendanceService.addAttendee(attendeeData);
  }
}
