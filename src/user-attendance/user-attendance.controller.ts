import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  // NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { UserAttendanceService } from './user-attendance.service';
import { Attendance } from './Attendance.interface';

@Controller('attendance')
export class UserAttendanceController {
  constructor(private readonly UserAttendanceService: UserAttendanceService) {}

  @Get()
  async getAllAttendance(): Promise<Attendance[]> {
    return this.UserAttendanceService.getAllAttendance();
  }

  @Get('getAttendanceById/:id')
  async getByID(@Param('id') id: string): Promise<Attendance | undefined> {
    const attendanceID = +id;
    return this.UserAttendanceService.findById(attendanceID);
  }

  // @Post('addAttendee')
  // async addAttendee(
  //   @Body() attendee: Partial<Attendance>,
  // ): Promise<Attendance | undefined> {
  //   if (!attendee.email || !attendee.types) return undefined;
  //   return this.UserAttendanceService.addAttendee(attendee);
  // }

  @Post('IN')
  async checkIn(
    @Body() attendee: Partial<Attendance>,
  ): Promise<Attendance | undefined> {
    if (!attendee.email) return undefined;
    return this.UserAttendanceService.checkIn(attendee);
  }

  @Post('OUT')
  async checkOut(
    @Body() attendee: Partial<Attendance>,
  ): Promise<Attendance | undefined> {
    if (!attendee.email) return undefined;
    return this.UserAttendanceService.checkOut(attendee);
  }

  // constructor(private readonly userAttendanceService: UserAttendanceService) {}

  // @Get()
  // async getAllAttendance(): Promise<Attendance[]> {
  //   return this.userAttendanceService.getAllAttendance();
  // }

  // @Get('getAttendanceById/:id')
  // async getByID(@Param('id') id: string): Promise<Attendance | undefined> {
  //   const attendanceID = +id;
  //   const attendance = await this.userAttendanceService.findById(attendanceID);
  //   if (!attendance) {
  //     throw new NotFoundException('Attendance not found');
  //   }
  //   return attendance;
  // }

  // @Post('addAttendee')
  // async addAttendee(
  //   @Body() attendee: Partial<Attendance>,
  // ): Promise<Attendance> {
  //   if (!attendee.email || !attendee.types) {
  //     throw new BadRequestException('Email and types are required');
  //   }
  //   return this.userAttendanceService.addAttendee(attendee);
  // }
}
