import { Injectable } from '@nestjs/common';
import SurrealDB from 'surrealdb.js';
import { Attendance } from './Attendance.interface';

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
    const result = await this.client.create<any>(this.table, attendance as any);
    return result[0] as Attendance;
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

  //Update the attendance
  async update(
    id: number,
    updatedData: Partial<Attendance>,
  ): Promise<Attendance | null> {
    await this.client.update<any>(`${this.table}:${id}`, updatedData as any);
    return this.findById(id);
  }

  // Delete an attendance record by ID
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.client.delete<any>(`${this.table}:${id}`);
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  }

  // Example of an advanced query
  async getMarketingStatistics(): Promise<any> {
    try {
      const result = await this.client.query<any>(
        'SELECT types, COUNT() FROM type::table($tb) GROUP BY types',
        {
          tb: this.table,
        },
      );
      return result;
    } catch (error) {
      console.error('Error executing advanced query:', error);
      return [];
    }
  }
}
