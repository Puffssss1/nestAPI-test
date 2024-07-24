import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  // NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { AttendanceService } from './user-attendance.service';
import { Attendance } from './Attendance.interface';

@Controller('attendance')
export class UserAttendanceController {
  constructor(private readonly AttendanceService: AttendanceService) {}

  @Get()
  async getAllAttendance(): Promise<Attendance[]> {
    return this.AttendanceService.getAllAttendance();
  }

  @Get('getAttendanceById/:id')
  async getByID(@Param('id') id: string): Promise<Attendance | undefined> {
    const attendanceID = +id;
    return this.AttendanceService.findById(attendanceID);
  }

  @Post('IN')
  async checkIn(
    @Body() attendee: Partial<Attendance>,
  ): Promise<Attendance | undefined> {
    if (!attendee.email) return undefined;
    return this.AttendanceService.checkIn(attendee);
  }

  @Post('OUT')
  async checkOut(
    @Body() attendee: Partial<Attendance>,
  ): Promise<Attendance | undefined> {
    if (!attendee.email) return undefined;
    return this.AttendanceService.checkOut(attendee);
  }
}
