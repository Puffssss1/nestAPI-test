import { Injectable } from '@nestjs/common';
import { Attendance, attendances } from './mockData';

@Injectable()
export class AttendanceService {
  getAllAttendance(): Attendance[] {
    return attendances;
  }

  // findById(attendanceId: number): Attendance | undefined {
  //   return attendances.find((attendance) => attendance.id === attendanceId);
  // }

  findById(attendanceId: number): Attendance | undefined {
    return attendances.find((attendance) => attendance.id === attendanceId);
  }

  addAttendee(attendee: Partial<Attendance>): Attendance {
    const lastAttendee = attendances[attendances.length - 1];
    const newID = lastAttendee.id + 1;

    const newAttendee: Attendance = {
      id: newID,
      email: attendee.email ?? '',
      timestamp: Number(attendee.timestamp ?? Date.now()),
      types: attendee.types ?? '',
    };

    attendances.push(newAttendee);

    return newAttendee;
  }
}
