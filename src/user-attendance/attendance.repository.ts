import { Injectable } from '@nestjs/common';
import SurrealDB from 'surrealdb.js';
import { Attendance } from './Attendance.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class AttendanceRepository {
  private readonly client: SurrealDB;
  private readonly table = 'attendance';

  constructor() {
    this.client = new SurrealDB();

    this.connect();
  }

  //connect to SurrealDB
  private async connect() {
    try {
      await this.client.connect('http://localhost:8000/rpc', {
        namespace: 'test',
        database: 'test',
        auth: {
          username: 'root',
          password: 'root',
        },
      });
      console.log('Connected to SurrealDB successfully.');
    } catch (error) {
      console.error('Error connecting to SurrealDB:', error);
    }
  }

  // Save a new attendance record
  async save(attendance: Attendance): Promise<Attendance> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { v7: uuidv7 } = require('uuid');
    const attendanceToSave: Attendance = {
      id: uuidv7(),
      ...attendance,
      timestamp: attendance.timestamp || Date.now(),
    };
    console.log('Attendance ID:', attendanceToSave.id);
    const result = await this.client.create<Attendance>(
      this.table,
      attendanceToSave,
    );
    const savedAttendance = result[0] as Attendance;
    return {
      ...savedAttendance,
      timestamp: new Date(savedAttendance.timestamp).getTime(),
    };
  }

  // Retrieve all attendance records
  async findAll(): Promise<Attendance[]> {
    const result = await this.client.select<any>(this.table);
    return result as Attendance[];
  }

  // Find a specific attendance record by ID
  async findById(id: number): Promise<Attendance | null> {
    const result = await this.client.select<any>(
      `${this.table} WHERE id = ${id}`,
    );
    return result[0] as Attendance | null;
  }

  // Find attendance records by email
  async findByEmail(email: string): Promise<Attendance[]> {
    const result = await this.client.select<any>(
      `${this.table} WHERE email = '${email}'`,
    );
    return result as Attendance[];
  }

  //Update the attendance *FOR FUTURE USE*
  async update(
    id: number,
    updatedData: Partial<Attendance>,
  ): Promise<Attendance | null> {
    await this.client.update<any>(`${this.table}:${id}`, updatedData as any);
    return this.findById(id);
  }

  // Delete an attendance record by *FOR FUTURE USE*
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.client.delete<any>(`${this.table}:${id}`);
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  }
}
