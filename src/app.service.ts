import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'working endpoints are;  /user-attendance , /user-attendance/getAttendanceById/:id , /user-attendance/addAttendee';
  }
}
