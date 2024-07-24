import { Injectable } from '@nestjs/common';
import { Attendance, attendances } from './mockData';
// import { Attendance } from './Attendance.interface';
// import { Surreal } from 'surrealdb.js';

@Injectable()
export class UserAttendanceService {
  getAllAttendance(): Attendance[] {
    return attendances;
  }

  findById(attendanceId: number): Attendance | undefined {
    return attendances.find((attendance) => attendance.id === attendanceId);
  }

  // addAttendee(attendee: Partial<Attendance>): Attendance {
  //   const lastAttendee = attendances[attendances.length - 1];
  //   const newID = lastAttendee.id + 1;

  //   const newAttendee: Attendance = {
  //     id: newID,
  //     email: attendee.email ?? '',
  //     timestamp: Number(attendee.timestamp ?? Date.now()),
  //     types: attendee.types ?? '',
  //   };

  //   attendances.push(newAttendee);
  //   return newAttendee;
  // }

  checkIn(attendee: Partial<Attendance>): Attendance {
    const lastAttendee = attendances[attendances.length - 1];
    const newID = lastAttendee.id + 1;

    const newCheckIn: Attendance = {
      id: newID,
      email: attendee.email ?? '',
      timestamp: Number(attendee.timestamp ?? Date.now()),
      types: String(attendee.types ?? 'IN'),
    };

    attendances.push(newCheckIn);
    return newCheckIn;
  }

  checkOut(attendee: Partial<Attendance>): Attendance {
    const lastAttendee = attendances[attendances.length - 1];
    const newID = lastAttendee.id + 1;

    const newCheckOut: Attendance = {
      id: newID,
      email: attendee.email ?? '',
      timestamp: Number(attendee.timestamp ?? Date.now()),
      types: String(attendee.types ?? 'OUT'),
    };

    attendances.push(newCheckOut);
    return newCheckOut;
  }

  // private db: Surreal;
  // private readonly logger = new Logger(UserAttendanceService.name);

  // constructor() {
  //   this.db = new Surreal();
  //   this.connect();
  // }

  // private async connect(): Promise<void> {
  //   try {
  //     await this.db.connect('http://localhost:8000/rpc');
  //     await this.db.use({ namespace: 'test', database: 'test' });
  //     this.logger.log('Successfully connected to SurrealDB');
  //   } catch (error) {
  //     this.logger.error('Error connecting to SurrealDB:', error.message);
  //     throw new Error('Could not connect to SurrealDB');
  //   }
  // }

  // async getAllAttendance(): Promise<Attendance[]> {
  //   try {
  //     const result = await this.db.query('SELECT * FROM attendance');
  //     return result as Attendance[];
  //   } catch (error) {
  //     this.logger.error('Error fetching attendance:', error.message);
  //     throw new Error('Could not fetch attendance');
  //   }
  // }

  // async findById(attendanceId: number): Promise<Attendance | undefined> {
  //   try {
  //     const result = await this.db.query(
  //       `SELECT * FROM attendance WHERE id = ${attendanceId}`,
  //     );
  //     const records = result as Attendance[];
  //     return records.length ? records[0] : undefined;
  //   } catch (error) {
  //     this.logger.error('Error fetching attendance by ID:', error.message);
  //     throw new Error('Could not fetch attendance by ID');
  //   }
  // }

  // async addAttendee(attendee: Partial<Attendance>): Promise<Attendance> {
  //   try {
  //     const newAttendee: Attendance = {
  //       id: attendee.id ?? (await this.getNextId()),
  //       email: attendee.email ?? '',
  //       timestamp: Number(attendee.timestamp ?? Date.now()),
  //       types: attendee.types ?? '',
  //     };

  //     await this.db.query(
  //       `INSERT INTO attendance SET ${this.toSQL(newAttendee)}`,
  //     );
  //     return newAttendee;
  //   } catch (error) {
  //     this.logger.error('Error adding attendee:', error.message);
  //     throw new Error('Could not add attendee');
  //   }
  // }

  // private async getNextId(): Promise<number> {
  //   try {
  //     const result = await this.db.query(
  //       'SELECT * FROM attendance ORDER BY id DESC LIMIT 1',
  //     );
  //     const records = result as Attendance[];
  //     return records.length ? records[0].id + 1 : 1;
  //   } catch (error) {
  //     this.logger.error('Error getting next ID:', error.message);
  //     throw new Error('Could not get next ID');
  //   }
  // }

  // private toSQL(obj: any): string {
  //   return Object.keys(obj)
  //     .map((key) => {
  //       const value = obj[key];
  //       if (typeof value === 'string') {
  //         return `${key} = '${value.replace(/'/g, "''")}'`;
  //       } else if (value === null || value === undefined) {
  //         return `${key} = NULL`;
  //       } else {
  //         return `${key} = ${value}`;
  //       }
  //     })
  //     .join(', ');
  // }
}
