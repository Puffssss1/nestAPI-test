import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AttendanceService } from './app.service';
import { Attendance } from './mockData';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attedanceService: AttendanceService) {}

  @Get()
  getAllAttendance(): Attendance[] {
    return this.attedanceService.getAllAttendance();
  }

  // @Get('getById/:id')
  // getByID(@Param('id') id: string): Attendance | undefined {
  //   const attendanceID = +id;
  //   return this.attedanceService.findById(attendanceID);
  // }

  @Get('getAttendanceById/:id')
  getByID(@Param('id') id: string): Attendance | undefined {
    const attendanceID = +id;
    return this.attedanceService.findById(attendanceID);
  }

  @Post('addAttendee')
  addAttendee(@Body() attendee: Partial<Attendance>): Attendance | undefined {
    const attendeeData = attendee;

    if (!attendee.email || !attendee.types) return undefined;

    return this.attedanceService.addAttendee(attendeeData);
  }
}
