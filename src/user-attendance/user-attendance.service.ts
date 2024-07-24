import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { Attendance } from './Attendance.interface';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async getAllAttendance(): Promise<Attendance[]> {
    return this.attendanceRepository.findAll();
  }

  async findById(id: number): Promise<Attendance | null> {
    return this.attendanceRepository.findById(id);
  }

  async checkIn(attendee: Partial<Attendance>): Promise<Attendance> {
    return this.attendanceRepository.save({
      ...attendee,
      types: 'IN',
    } as Attendance);
  }

  async checkOut(attendee: Partial<Attendance>): Promise<Attendance> {
    return this.attendanceRepository.save({
      ...attendee,
      types: 'OUT',
    } as Attendance);
  }
}
